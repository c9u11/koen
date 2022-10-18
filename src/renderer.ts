const { ipcRenderer } = require("electron");
const {
  IPC_DEFAULT_SETTING,
  IPC_SET_SHORTCUT,
  IPC_CHANGED_SHORTCUT,
  IPC_SET_ENABLED,
  IPC_CHANGED_ENABLED,
} = require("./dist/constant/ipc");

window.onload = () => {
  const shortcutInput = document.getElementById(
    "shortcut-input"
  ) as HTMLInputElement;
  const setShortcutBtn = document.getElementById("save-btn");
  const unAvailableList: string[] = [];
  const shortcutKey = {
    modifier: {
      Control: false,
      Alt: false,
      Meta: false,
      Shift: false,
    },
    key: "",
  };

  shortcutInput.addEventListener("keydown", (evt) => {
    evt.preventDefault();
    const key = evt.key;
    const isAvailable = unAvailableList.indexOf(key) === -1;
    if (!isAvailable) {
      console.log("isUnavailable!!!");
      return;
    }
    const isModifier =
      key === "Control" || key === "Alt" || key === "Meta" || key === "Shift";
    if (isModifier) {
      shortcutKey.modifier[key] = true;
    } else {
      shortcutKey.key = key;
    }

    shortcutInput.value =
      Object.keys(shortcutKey.modifier)
        .filter(
          (key: "Control" | "Alt" | "Meta" | "Shift") =>
            shortcutKey.modifier[key]
        )
        .join(" + ") + (shortcutKey.key !== "" ? ` + ${shortcutKey.key}` : "");
  });

  setShortcutBtn.addEventListener("click", (evt) => {
    const inputValue = shortcutInput.innerText.split(" + ");
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
      toggleBtn.checked = payload.enabled;
      // document.getElementById("text-box").textContent = payload;
    }
  );
};
