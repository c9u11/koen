"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var robotjs_1 = require("@hurdlegroup/robotjs");
var ipc_1 = require("./constant/ipc");
var koen_1 = require("./util/koen");
var isDev = require("electron-is-dev");
var appMain = {
    enabled: true,
    shortcutKey: "Shift + Space",
    isChangeInputSource: false
};
var EnabledIcon = electron_1.nativeImage.createFromPath(path.join(__dirname, "./assets/icons/template/Template@4x.png"));
var createSettingWindow = function () {
    appMain.settingWindow = new electron_1.BrowserWindow({
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
            contextIsolation: false
        }
    });
    if (isDev) {
        appMain.settingWindow.loadURL("http://localhost:3000");
        appMain.settingWindow.webContents.openDevTools();
    }
    else {
        appMain.settingWindow.loadFile(path.join(__dirname, "../build/index.html"));
    }
    appMain.settingWindow.show();
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", function () {
    electron_1.app.dock.hide();
    appMain.menu = electron_1.Menu.buildFromTemplate([
        {
            id: "enabled",
            label: "KoEn 활성화",
            type: "checkbox",
            checked: appMain.enabled,
            click: function (item, window, event) {
                var _a;
                setEnabled(item.checked);
                (_a = appMain.settingWindow) === null || _a === void 0 ? void 0 : _a.webContents.send(ipc_1.IPC_CHANGED_ENABLED, item.checked);
            }
        },
        { type: "separator" },
        {
            label: "환경설정...",
            click: function (item, window, event) {
                createSettingWindow();
            }
        },
        {
            label: "KoEn 종료",
            click: function (item, window, event) {
                electron_1.app.exit(0);
            }
        },
    ]);
    appMain.tray = new electron_1.Tray(EnabledIcon);
    appMain.tray.setToolTip("KoEn");
    // appMain.tray.setTitle("KoEn");
    appMain.tray.setContextMenu(appMain.menu);
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("before-quit", function () {
    // Unregister shortcut
    unregisterShortcut();
    // Unregister all shortcuts.
    electron_1.globalShortcut.unregisterAll();
    // appMain null
    // appMain = null;
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
/*
  Main Function
*/
var convert = function () { return __awaiter(void 0, void 0, void 0, function () {
    var currentClipboardContent, selectedText, convertedText;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentClipboardContent = electron_1.clipboard.readText();
                selectedText = "";
                if (!(currentClipboardContent === "ITISKOENTESTTEXT")) return [3 /*break*/, 1];
                selectedText = "zhos";
                return [3 /*break*/, 3];
            case 1:
                electron_1.clipboard.clear();
                (0, robotjs_1.keyTap)("c", process.platform === "darwin" ? "command" : "control");
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
            case 2:
                _a.sent();
                selectedText = electron_1.clipboard.readText();
                _a.label = 3;
            case 3:
                convertedText = (0, koen_1.koen)(selectedText);
                electron_1.clipboard.writeText(currentClipboardContent);
                (0, robotjs_1.typeString)(convertedText);
                return [2 /*return*/, {
                        selectedText: selectedText,
                        convertedText: convertedText
                    }];
        }
    });
}); };
var changeInputSource = function () {
    if (process.platform === "darwin")
        (0, robotjs_1.keyTap)("space", "control");
    console.log("Input Source Changed");
};
var shortcutHandler = function () {
    if (appMain.enabled) {
        convert()
            .then(function (result) {
            console.log("Conversion Success : ".concat(result.convertedText));
        })["catch"](function (result) {
            console.log("Conversion Failed : ".concat(result.selectedText));
        });
        if (appMain.isChangeInputSource)
            changeInputSource();
    }
};
var registerShortcut = function () {
    // Register a shortcut listener.
    var ret = electron_1.globalShortcut.register(appMain.shortcutKey, shortcutHandler);
    var isRegisterd = ret && electron_1.globalShortcut.isRegistered(appMain.shortcutKey);
    console.log("Registration ".concat(isRegisterd ? "Success" : "Failed", " : ").concat(appMain.shortcutKey));
};
var unregisterShortcut = function () {
    // Unregister a shortcut.
    electron_1.globalShortcut.unregister(appMain.shortcutKey);
};
var setEnabled = function (enabled) {
    var _a;
    appMain.enabled = enabled;
    var enabledMenuIcon = (_a = appMain.menu) === null || _a === void 0 ? void 0 : _a.getMenuItemById("enabled");
    if (enabledMenuIcon)
        enabledMenuIcon.checked = enabled;
    console.log("KoEn \uD65C\uC131\uD654 : ".concat(appMain.enabled));
};
var setIsChangeInputSource = function (isChangeInputSource) {
    var _a;
    appMain.isChangeInputSource = isChangeInputSource;
    (_a = appMain.settingWindow) === null || _a === void 0 ? void 0 : _a.webContents.send(ipc_1.IPC_CHANGED_IS_CHANGE_INPUT_SOURCE, isChangeInputSource);
    console.log("\uC785\uB825\uC18C\uC2A4 \uBCC0\uACBD \uC124\uC815 : ".concat(appMain.isChangeInputSource));
};
electron_1.app.whenReady().then(function () {
    registerShortcut();
    electron_1.ipcMain.on(ipc_1.IPC_SET_SHORTCUT, function (evt, payload) {
        if (payload === undefined)
            evt.reply(ipc_1.IPC_CHANGED_SHORTCUT, appMain.shortcutKey);
        else {
            unregisterShortcut();
            appMain.shortcutKey = payload;
            registerShortcut();
            evt.reply(ipc_1.IPC_CHANGED_SHORTCUT, payload);
        }
    });
    electron_1.ipcMain.on(ipc_1.IPC_SET_ENABLED, function (evt, payload) {
        if (payload === undefined)
            evt.reply(ipc_1.IPC_CHANGED_ENABLED, appMain.enabled);
        else {
            setEnabled(payload);
            evt.reply(ipc_1.IPC_CHANGED_ENABLED, payload);
        }
    });
    electron_1.ipcMain.on(ipc_1.IPC_SETTING_START, function () {
        setEnabled(false);
    });
    electron_1.ipcMain.on(ipc_1.IPC_SETTING_END, function () {
        setEnabled(true);
    });
    electron_1.ipcMain.on(ipc_1.IPC_SET_IS_CHANGE_INPUT_SOURCE, function (evt, payload) {
        if (payload === undefined)
            evt.reply(ipc_1.IPC_CHANGED_IS_CHANGE_INPUT_SOURCE, appMain.isChangeInputSource);
        else {
            setIsChangeInputSource(payload);
            evt.reply(ipc_1.IPC_CHANGED_IS_CHANGE_INPUT_SOURCE, payload);
        }
    });
});
