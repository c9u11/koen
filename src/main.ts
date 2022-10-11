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
import { keyTap, typeString } from "robotjs";
import { convertEngToKor } from "./util/convertEngtoKor";
import {
  IPC_DEFAULT_SETTING,
  IPC_CHANGE_SHORTCUT,
  IPC_GET_SHORTCUT,
} from "./constant/ipc";

interface AppMainInterface {
  enabled: boolean;
  shortcutKey: string[];
  settingWindow?: BrowserWindow;
  tray?: Tray;
  icons?: BrowserWindow;
}

const appMain: AppMainInterface = {
  enabled: true,
  shortcutKey: ["Shift", "Space"],
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  appMain.settingWindow = new BrowserWindow({
    title: "KoEn",
    width: 800,
    height: 600,
    center: true,
    show: false,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true,
      // sandbox: true,
      contextIsolation: false,
    },
  });
  const menu = Menu.buildFromTemplate([
    {
      label: "KoEn 활성화",
      type: "checkbox",
      checked: appMain.enabled,
      click: (item, window, event) => {
        appMain.enabled = item.checked;
        console.log(`KoEn 활성화 : ${appMain.enabled}`);
      },
    },
    { type: "separator" },
    {
      label: "환경설정...",
      click: (item, window, event) => {
        appMain.settingWindow.show();
      },
    },
    { role: "quit", label: "KoEn 종료" },
  ]);
  appMain.settingWindow.loadFile(path.join(__dirname, "../index.html"));
  appMain.settingWindow.webContents.openDevTools();
  appMain.settingWindow.webContents.on("did-finish-load", () => {
    // onWebcontentsValue 이벤트 송신
    appMain.settingWindow.webContents.send(
      IPC_DEFAULT_SETTING,
      appMain.shortcutKey
    );
  });
  appMain.settingWindow.on("close", (ev: Electron.Event) => {
    appMain.settingWindow.hide();
    ev.preventDefault();
  });
  appMain.tray = new Tray(nativeImage.createEmpty());
  appMain.tray.setToolTip("KoEn");
  appMain.tray.setTitle("KoEn");
  appMain.tray.setContextMenu(menu);
  // app.on("activate", function () {
  //   // On macOS it's common to re-create a window in the app when the
  //   // dock icon is clicked and there are no other windows open.
  //   if (BrowserWindow.getAllWindows().length === 0) createWindow();
  // });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

/* 
  Main Function
*/
const koen = async () => {
  const currentClipboardContent = clipboard.readText();
  clipboard.clear();
  keyTap("c", process.platform === "darwin" ? "command" : "control");
  await new Promise((resolve) => setTimeout(resolve, 200));
  const selectedText = clipboard.readText();
  const convertedText = convertEngToKor(selectedText);
  clipboard.writeText(currentClipboardContent);
  typeString(convertedText);
  return {
    selectedText,
    convertedText,
  };
};

const shortcutHandler = () => {
  if (appMain.enabled)
    koen()
      .then((result) => {
        console.log(`Conversion Success : ${result.convertedText}`);
      })
      .catch((result) => {
        console.log(`Conversion Failed : ${result.selectedText}`);
      });
};

const registerShortcut = () => {
  const shortcutKeyString = appMain.shortcutKey.join("+");
  // Register a shortcut listener.
  console.log(shortcutKeyString);
  const ret = globalShortcut.register(shortcutKeyString, shortcutHandler);
  console.log(shortcutKeyString);
  let isRegisterd = ret && globalShortcut.isRegistered(shortcutKeyString);
  console.log(shortcutKeyString);

  console.log(
    `Registration ${isRegisterd ? "Success" : "Failed"} : ${shortcutKeyString}`
  );
};

const unregisterShortcut = () => {
  const shortcutKeyString = appMain.shortcutKey.join("+");
  // Unregister a shortcut.
  globalShortcut.unregister(shortcutKeyString);
};

app.whenReady().then(() => {
  registerShortcut();
  ipcMain.on(IPC_CHANGE_SHORTCUT, (evt, payload) => {
    console.log("IPC_CHANGE_SHORTCUT : ", payload);
    unregisterShortcut();
    appMain.shortcutKey = payload;
    registerShortcut();
    // IPC_GET_SHORTCUT 송신 또는 응답
    evt.reply(IPC_GET_SHORTCUT, payload);
  });
});

app.on("will-quit", () => {
  unregisterShortcut();
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
