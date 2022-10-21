const { ipcRenderer } = require("electron");
const {
  IPC_DEFAULT_SETTING,
  IPC_SET_SHORTCUT,
  IPC_CHANGED_SHORTCUT,
  IPC_SET_ENABLED,
  IPC_CHANGED_ENABLED,
  IPC_SETTING_START,
  IPC_SETTING_END,
} = require("./dist/constant/ipc");

window.onload = () => {
  // Variables
  let settedShortcutKey: string[] = [];
  const unAvailableList: string[] = [];

  // Elements
  const toggleBtn = document.getElementById("toggle-btn") as HTMLInputElement;
  const shortcutInput = document.getElementById(
    "shortcut-input"
  ) as HTMLInputElement;
  const saveShortcutBtn = document.getElementById("save-btn");
  const cancelShortcutBtn = document.getElementById("cancel-btn");
  const enabledChangedHandler = (enabled: boolean) => {
    toggleBtn.checked = enabled;
  };
  const setShortcutInputValue = (val: string[]) =>
    (shortcutInput.value = val.join(" + "));
  const shortcutChangedHandler = (shorcutKey: string[]) => {
    settedShortcutKey = shorcutKey;
    setShortcutInputValue(settedShortcutKey);
  };

  // Element Events Listener
  toggleBtn.addEventListener("click", (evt) => {
    ipcRenderer.send(IPC_SET_ENABLED, toggleBtn.checked);
  });
  shortcutInput.addEventListener("keydown", (evt) => {
    evt.preventDefault();
    const key = evt.code === "Space" ? "Space" : evt.key;
    const isAvailable = unAvailableList.indexOf(key) === -1;
    if (!isAvailable) {
      console.log("isUnavailable!!!");
      return;
    }
    ipcRenderer.send(IPC_SETTING_START);
    const tempShortcutKey = [];
    if (evt.altKey) tempShortcutKey.push("Alt");
    if (evt.ctrlKey) tempShortcutKey.push("Control");
    if (evt.metaKey) tempShortcutKey.push("Meta");
    if (evt.shiftKey) tempShortcutKey.push("Shift");
    if (["Alt", "Control", "Meta", "Shift"].indexOf(key) === -1)
      tempShortcutKey.push(key);

    setShortcutInputValue(tempShortcutKey);
  });
  shortcutInput.addEventListener("keyup", (evt) => {
    if (evt.shiftKey || evt.metaKey || evt.ctrlKey || evt.altKey) return;
    ipcRenderer.send(IPC_SETTING_END);
  });
  saveShortcutBtn.addEventListener("click", (evt) => {
    ipcRenderer.send(IPC_SET_SHORTCUT, shortcutInput.value.split(" + "));
  });
  cancelShortcutBtn.addEventListener("click", (evt) => {
    setShortcutInputValue(settedShortcutKey);
  });

  // IPC Events Listener
  ipcRenderer.on(IPC_CHANGED_ENABLED, (evt, payload) => {
    enabledChangedHandler(payload);
  });
  ipcRenderer.on(IPC_CHANGED_SHORTCUT, (evt, payload: string[]) => {
    shortcutChangedHandler(payload);
  });
  ipcRenderer.on(
    IPC_DEFAULT_SETTING,
    (evt, payload: { enabled: boolean; defaultShortcutKey: string[] }) => {
      enabledChangedHandler(payload.enabled);
      shortcutChangedHandler(payload.defaultShortcutKey);
    }
  );
};
