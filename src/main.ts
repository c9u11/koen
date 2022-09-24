import { app, BrowserWindow, globalShortcut, clipboard } from "electron";
import * as path from "path";
import { keyTap } from "robotjs";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
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

app.whenReady().then(() => {
  // Register a 'Ctrl+Shift+Space' shortcut listener.
  const ret = globalShortcut.register("Ctrl+Shift+Space", () => {
    console.log("press!");
    getSelectedText().then((selectedText) => console.log(selectedText));
  });

  if (!ret) {
    console.log("registration failed");
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered("Ctrl+Shift+Space"));
});

app.on("will-quit", () => {
  // Unregister a shortcut.
  globalShortcut.unregister("Ctrl+Shift+Space");

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const getSelectedText = async () => {
  const currentClipboardContent = clipboard.readText(); // preserve clipboard content
  clipboard.clear();
  keyTap("c", process.platform === "darwin" ? "command" : "control");
  await new Promise((resolve) => setTimeout(resolve, 200)); // add a delay before checking clipboard
  const selectedText = clipboard.readText();
  clipboard.writeText(currentClipboardContent);
  return selectedText;
};
