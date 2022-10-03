import {
  app,
  BrowserWindow,
  globalShortcut,
  clipboard,
  ipcMain,
} from "electron";
import * as path from "path";
import { keyTap, typeString } from "robotjs";
import { convertEngToKor } from "./util/convertEngtoKor";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 800,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
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
let shortcutKey: string[] = ["Shift", "Space"];
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
  koen()
    .then((result) => {
      console.log(`Conversion Success : ${result.convertedText}`);
    })
    .catch((result) => {
      console.log(`Conversion Failed : ${result.selectedText}`);
    });
};

const registerShortcut = () => {
  const shortcutKeyString = shortcutKey.join("+");
  // Register a shortcut listener.
  const ret = globalShortcut.register(shortcutKeyString, shortcutHandler);
  let isRegisterd = ret && globalShortcut.isRegistered(shortcutKeyString);

  console.log(
    `Registration ${isRegisterd ? "Success" : "Failed"} : ${shortcutKeyString}`
  );
};

const unregisterShortcut = () => {
  const shortcutKeyString = shortcutKey.join("+");
  // Unregister a shortcut.
  globalShortcut.unregister(shortcutKeyString);
};

app.whenReady().then(() => {
  registerShortcut();
  ipcMain.on("onInputValue", (evt, payload) => {
    console.log("on ipcMain event:: ", payload);

    const computedPayload = payload + "(computed)";

    // replyInputValue 송신 또는 응답
    evt.reply("replyInputValue", computedPayload);
  });
});

app.on("will-quit", () => {
  unregisterShortcut();
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
