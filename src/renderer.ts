const { ipcRenderer } = require("electron");
const {
  IPC_DEFAULT_SETTING,
  IPC_CHANGE_SHORTCUT,
  IPC_GET_SHORTCUT,
} = require("./dist/constant/ipc");

window.onload = () => {
  const btnEl = document.getElementById("save-btn");

  btnEl.addEventListener("click", (evt) => {
    const inputValue = [
      (document.getElementById("modifier-select") as HTMLSelectElement).value,
      (
        document.getElementById("key-select") as HTMLInputElement
      ).value.toUpperCase(),
    ];
    console.log(inputValue);

    // IPC_CHANGE_SHORTCUT 이벤트 송신
    ipcRenderer.send(IPC_CHANGE_SHORTCUT, inputValue);
  });

  // IPC_GET_SHORTCUT에 대한 응답 수신
  ipcRenderer.on(IPC_GET_SHORTCUT, (evt, payload) => {
    // document.getElementById("text-box").textContent = payload;
  });

  // IPC_DEFAULT_SETTING에 대한 이벤트 수신
  ipcRenderer.on(IPC_DEFAULT_SETTING, (evt, payload) => {
    // document.getElementById("text-box").textContent = payload;
  });
};
