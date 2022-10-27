const { ipcRenderer, clipboard } = require("electron");
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
  let currentClipboardContent: string = "";

  // Elements
  const toggleBtn = document.getElementById("toggle-btn") as HTMLInputElement;
  const shortcutInput = document.getElementById(
    "shortcut-input"
  ) as HTMLInputElement;
  const saveShortcutBtn = document.getElementById(
    "save-btn"
  ) as HTMLButtonElement;
  const cancelShortcutBtn = document.getElementById(
    "cancel-btn"
  ) as HTMLButtonElement;
  const testBtn = document.getElementById("test-btn");
  const enabledChangedHandler = (enabled: boolean) => {
    toggleBtn.checked = enabled;
  };
  const setShortcutInputValue = (val: string[]) => {
    const isChanged = JSON.stringify(settedShortcutKey) !== JSON.stringify(val);
    const conditions = {
      Key: false,
      Alt: false,
      Control: false,
      Meta: false,
      Shift: false,
      Modifier: false,
    };
    for (let key of val) {
      switch (key) {
        case "Alt":
        case "Control":
        case "Meta":
        case "Shift":
          conditions[key] = true;
          conditions["Modifier"] = true;
          break;
        default:
          conditions["Key"] = true;
          break;
      }
    }
    for (let key of Object.keys(conditions)) {
      const classList = document.getElementById(
        `condition-${key.toLowerCase()}`
      ).classList;
      if (conditions[key as "Key" | "Alt" | "Control" | "Meta" | "Shift"])
        classList.add("satisfied");
      else classList.remove("satisfied");
    }
    if (isChanged && conditions.Modifier && conditions.Key) {
      saveShortcutBtn.disabled = false;
      shortcutInput.classList.add("satisfied");
    } else {
      saveShortcutBtn.disabled = true;
      shortcutInput.classList.remove("satisfied");
    }
    if (isChanged) {
      cancelShortcutBtn.disabled = false;
    } else {
      cancelShortcutBtn.disabled = true;
    }
    shortcutInput.value = val.join(" + ");
  };
  const shortcutChangedHandler = (shorcutKey: string[]) => {
    settedShortcutKey = shorcutKey;
    setShortcutInputValue(settedShortcutKey);
  };

  // Element Events Listener
  toggleBtn.addEventListener("click", (evt) => {
    ipcRenderer.send(IPC_SET_ENABLED, toggleBtn.checked);
  });
  shortcutInput.addEventListener("focus", (evt) => {
    setShortcutInputValue([]);
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

  testBtn.addEventListener("focusin", (evt) => {
    testBtn.classList.add("isTesting");
    currentClipboardContent = clipboard.readText();
    clipboard.writeText("ITISKOENTESTTEXT");
  });
  testBtn.addEventListener("focusout", (evt) => {
    testBtn.classList.remove("isTesting");
    clipboard.writeText(currentClipboardContent);
    currentClipboardContent = "";
  });

  testBtn.addEventListener("keydown", (evt) => {
    const isPressedModifier =
      evt.altKey || evt.shiftKey || evt.ctrlKey || evt.metaKey;
    const isPressedKey =
      ["Alt", "Control", "Meta", "Shift"].indexOf(evt.key) === -1;

    if (isPressedKey && isPressedModifier) {
      if (evt.key === "쾐") {
        testBtn.classList.add("success");
        testBtn.classList.remove("fail");
      } else {
        testBtn.classList.remove("success");
        testBtn.classList.add("fail");
      }
    }
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
