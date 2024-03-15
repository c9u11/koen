import {
  app,
  BrowserWindow,
  globalShortcut,
  clipboard,
  ipcMain,
  Tray,
  nativeImage,
  Menu,
} from "electron";
import * as path from "path";
import { keyTap, typeString } from "@hurdlegroup/robotjs";
import {
  IPC_SET_ENABLED,
  IPC_CHANGED_ENABLED,
  IPC_SET_SHORTCUT,
  IPC_CHANGED_SHORTCUT,
  IPC_SETTING_START,
  IPC_SETTING_END,
  IPC_CHANGED_IS_CHANGE_INPUT_SOURCE,
  IPC_SET_IS_CHANGE_INPUT_SOURCE,
} from "./constant/ipc";
import { koen } from "./util/koen";
import * as isDev from "electron-is-dev";

interface AppMainInterface {
  enabled: boolean;
  shortcutKey: string;
  isChangeInputSource: boolean;
  settingWindow?: BrowserWindow;
  menu?: Menu;
  tray?: Tray;
  icons?: BrowserWindow;
}

const appMain: AppMainInterface | null = {
  enabled: true,
  shortcutKey: "Shift + Space",
  isChangeInputSource: false,
};

const EnabledIcon = nativeImage.createFromPath(
  path.join(__dirname, "./assets/icons/template/Template@4x.png")
);

const createSettingWindow = () => {
  appMain.settingWindow = new BrowserWindow({
    title: "KoEn",
    width: 500,
    height: 400,
    center: true,
    show: false,
    resizable: isDev ? true : false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true,
      // sandbox: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    appMain.settingWindow.loadURL("http://localhost:3000");
    appMain.settingWindow.webContents.openDevTools();
  } else {
    appMain.settingWindow.loadFile(path.join(__dirname, "../build/index.html"));
  }
  appMain.settingWindow.show();
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  app.dock.hide();

  appMain.menu = Menu.buildFromTemplate([
    {
      id: "enabled",
      label: "KoEn 활성화",
      type: "checkbox",
      checked: appMain.enabled,
      click: (item, window, event) => {
        setEnabled(item.checked);
        appMain.settingWindow?.webContents.send(
          IPC_CHANGED_ENABLED,
          item.checked
        );
      },
    },
    { type: "separator" },
    {
      label: "환경설정...",
      click: (item, window, event) => {
        createSettingWindow();
      },
    },
    {
      label: "KoEn 종료",
      click: (item, window, event) => {
        app.exit(0);
      },
    },
  ]);

  appMain.tray = new Tray(EnabledIcon);
  appMain.tray.setToolTip("KoEn");
  // appMain.tray.setTitle("KoEn");
  appMain.tray.setContextMenu(appMain.menu);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  // Unregister shortcut
  unregisterShortcut();
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
  // appMain null
  // appMain = null;
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

/* 
  Main Function
*/
const convert = async () => {
  const currentClipboardContent = clipboard.readText();
  let selectedText = "";
  if (currentClipboardContent === "ITISKOENTESTTEXT") {
    selectedText = "zhos";
  } else {
    clipboard.clear();
    keyTap("c" as "tab", process.platform === "darwin" ? "command" : "control");
    await new Promise((resolve) => setTimeout(resolve, 200));
    selectedText = clipboard.readText();
  }
  const convertedText = koen(selectedText);
  clipboard.writeText(currentClipboardContent);
  typeString(convertedText);
  return {
    selectedText,
    convertedText,
  };
};

const changeInputSource = () => {
  if (process.platform === "darwin") keyTap("space", "control");

  console.log("Input Source Changed");
};

const shortcutHandler = () => {
  if (appMain.enabled) {
    convert()
      .then((result) => {
        console.log(`Conversion Success : ${result.convertedText}`);
      })
      .catch((result) => {
        console.log(`Conversion Failed : ${result.selectedText}`);
      });
    if (appMain.isChangeInputSource) changeInputSource();
  }
};

const registerShortcut = () => {
  // Register a shortcut listener.
  const ret = globalShortcut.register(appMain.shortcutKey, shortcutHandler);
  let isRegisterd = ret && globalShortcut.isRegistered(appMain.shortcutKey);

  console.log(
    `Registration ${isRegisterd ? "Success" : "Failed"} : ${
      appMain.shortcutKey
    }`
  );
};

const unregisterShortcut = () => {
  // Unregister a shortcut.
  globalShortcut.unregister(appMain.shortcutKey);
};

const setEnabled = (enabled: boolean) => {
  appMain.enabled = enabled;
  const enabledMenuIcon = appMain.menu?.getMenuItemById("enabled");
  if (enabledMenuIcon) enabledMenuIcon.checked = enabled;
  console.log(`KoEn 활성화 : ${appMain.enabled}`);
};

const setIsChangeInputSource = (isChangeInputSource: boolean) => {
  appMain.isChangeInputSource = isChangeInputSource;
  appMain.settingWindow?.webContents.send(
    IPC_CHANGED_IS_CHANGE_INPUT_SOURCE,
    isChangeInputSource
  );
  console.log(`입력소스 변경 설정 : ${appMain.isChangeInputSource}`);
};

app.whenReady().then(() => {
  registerShortcut();
  ipcMain.on(IPC_SET_SHORTCUT, (evt, payload?: string) => {
    if (payload === undefined)
      evt.reply(IPC_CHANGED_SHORTCUT, appMain.shortcutKey);
    else {
      unregisterShortcut();
      appMain.shortcutKey = payload;
      registerShortcut();
      evt.reply(IPC_CHANGED_SHORTCUT, payload);
    }
  });
  ipcMain.on(IPC_SET_ENABLED, (evt, payload?: boolean) => {
    if (payload === undefined) evt.reply(IPC_CHANGED_ENABLED, appMain.enabled);
    else {
      setEnabled(payload);
      evt.reply(IPC_CHANGED_ENABLED, payload);
    }
  });
  ipcMain.on(IPC_SETTING_START, () => {
    setEnabled(false);
  });
  ipcMain.on(IPC_SETTING_END, () => {
    setEnabled(true);
  });
  ipcMain.on(IPC_SET_IS_CHANGE_INPUT_SOURCE, (evt, payload?: boolean) => {
    if (payload === undefined)
      evt.reply(
        IPC_CHANGED_IS_CHANGE_INPUT_SOURCE,
        appMain.isChangeInputSource
      );
    else {
      setIsChangeInputSource(payload);
      evt.reply(IPC_CHANGED_IS_CHANGE_INPUT_SOURCE, payload);
    }
  });
});
