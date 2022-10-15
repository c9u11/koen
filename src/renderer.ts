const { ipcRenderer } = require("electron");
const {
  IPC_DEFAULT_SETTING,
  IPC_SET_SHORTCUT,
  IPC_CHANGED_SHORTCUT,
  IPC_SET_ENABLED,
  IPC_CHANGED_ENABLED,
} = require("./dist/constant/ipc");

window.onload = () => {
  const setShortcutBtn = document.getElementById("save-btn");
  setShortcutBtn.addEventListener("click", (evt) => {
    const inputValue = [
      (document.getElementById("modifier-select") as HTMLSelectElement).value,
      (
        document.getElementById("key-select") as HTMLInputElement
      ).value.toUpperCase(),
    ];

    // IPC_SET_SHORTCUT 이벤트 송신
    ipcRenderer.send(IPC_SET_SHORTCUT, inputValue);
  });

  // IPC_CHANGED_SHORTCUT에 대한 응답 수신
  ipcRenderer.on(IPC_CHANGED_SHORTCUT, (evt, payload) => {
    // document.getElementById("text-box").textContent = payload;
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
    (evt, payload: { enabled: boolean; shortcutKey: string[] }) => {
      console.log("test", payload);
      toggleBtn.nodeValue = String(payload.enabled);
      // document.getElementById("text-box").textContent = payload;
    }
  );
};
