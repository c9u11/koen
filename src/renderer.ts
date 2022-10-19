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
  const shortcutInput = document.getElementById(
    "shortcut-input"
  ) as HTMLInputElement;
  const saveShortcutBtn = document.getElementById("save-btn");
  const cancelShortcutBtn = document.getElementById("cancel-btn");
  const unAvailableList: string[] = [];
  let settedShortcutKey: string[] = [];

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

    shortcutInput.value = tempShortcutKey.join(" + ");
  });

  shortcutInput.addEventListener("keyup", (evt) => {
    if (evt.shiftKey || evt.metaKey || evt.ctrlKey || evt.altKey) return;
    ipcRenderer.send(IPC_SETTING_END);
  });

  saveShortcutBtn.addEventListener("click", (evt) => {
    const inputValue = shortcutInput.value.split(" + ");
    // IPC_SET_SHORTCUT 이벤트 송신
    ipcRenderer.send(IPC_SET_SHORTCUT, inputValue);
  });

  cancelShortcutBtn.addEventListener("click", (evt) => {
    shortcutInput.value = settedShortcutKey.join(" + ");
  });

  // IPC_CHANGED_SHORTCUT에 대한 응답 수신
  ipcRenderer.on(IPC_CHANGED_SHORTCUT, (evt, payload: string[]) => {
    settedShortcutKey = payload;
    shortcutInput.value = settedShortcutKey.join(" + ");
  });

  const toggleBtn = document.getElementById("toggle-btn") as HTMLInputElement;
  toggleBtn.addEventListener("click", (evt) => {
    ipcRenderer.send(IPC_SET_ENABLED, toggleBtn.checked);
  });

  ipcRenderer.on(IPC_CHANGED_ENABLED, (evt, payload) => {
    toggleBtn.checked = payload;
  });

  // IPC_DEFAULT_SETTING에 대한 이벤트 수신
  ipcRenderer.on(
    IPC_DEFAULT_SETTING,
    (evt, payload: { enabled: boolean; defaultShortcutKey: string[] }) => {
      toggleBtn.checked = payload.enabled;
      settedShortcutKey = payload.defaultShortcutKey;
      shortcutInput.value = settedShortcutKey.join(" + ");
    }
  );
};
