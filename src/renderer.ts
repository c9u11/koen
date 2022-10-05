const { ipcRenderer } = require("electron");
const { IPC_DEFAULT_SETTING } = require("./dist/constant/ipc");

window.onload = () => {
  const btnEl = document.getElementById("btn");

  btnEl.addEventListener("click", (evt) => {
    const inputValue = (
      document.getElementById("text-input") as HTMLInputElement
    ).value;

    // onInputValue 이벤트 송신
    ipcRenderer.send("onInputValue", inputValue);
  });

  // replyInputValue에 대한 응답 수신
  ipcRenderer.on("replyInputValue", (evt, payload) => {
    document.getElementById("text-box").textContent = payload;
  });

  // onWebcontentsValue에 대한 이벤트 수신
  ipcRenderer.on(IPC_DEFAULT_SETTING, (evt, payload) => {
    document.getElementById("text-box").textContent = payload;
  });
};
