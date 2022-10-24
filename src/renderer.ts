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
    if (isChanged) {
      const conditions = {
        key: false,
        alt: false,
        control: false,
        meta: false,
        shift: false,
        modifier: false,
      };
      for (let key of Object.keys(conditions)) {
        switch (key) {
          case "key":
          case "alt":
          case "control":
          case "meta":
          case "shift":
          case "modifier":
            const isSatisfied =
              key !== "modifier"
                ? val.indexOf(key) !== -1
                : conditions.alt ||
                  conditions.control ||
                  conditions.meta ||
                  conditions.shift;
            console.log(isSatisfied);
            conditions[key] = isSatisfied;
            const el = document.getElementById(`condition-${key}`);
            if (isSatisfied) el.classList.add("satisfied");
            else el.classList.remove("satisfied");
            break;
        }
      }
      if (conditions.modifier) saveShortcutBtn.disabled = false;
      else saveShortcutBtn.disabled = true;
      cancelShortcutBtn.disabled = false;
    } else {
      saveShortcutBtn.disabled = true;
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

  testBtn.addEventListener("keydown", (evt) => {
    if (evt.key === "쾐") console.log("Available");
    if (
      evt.shiftKey ||
      evt.ctrlKey ||
      evt.altKey ||
      !evt.metaKey ||
      evt.key !== "c"
    )
      return;
    clipboard.writeText("zhos");
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
