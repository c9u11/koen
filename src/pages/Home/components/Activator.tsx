import { useEffect, useState } from "react";
import { Checkbox } from "../../../components/Input";
import { ItemContent, ItemTitle } from "../../../components/Menu";
import {
  IPC_CHANGED_ENABLED,
  IPC_DEFAULT_SETTING,
  IPC_SET_ENABLED,
} from "../../../constant/Ipc";
import { IpcRenderer } from "electron";
const Electron = window.require("electron");
const ipcRenderer: IpcRenderer = Electron.ipcRenderer;

function Activator() {
  const [checked, setChecked] = useState(true);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    ipcRenderer.send(IPC_SET_ENABLED, e.target.checked);
  };

  useEffect(() => {
    ipcRenderer.on(IPC_CHANGED_ENABLED, (evt, payload: boolean) => {
      setChecked(payload);
    });

    ipcRenderer.on(
      IPC_DEFAULT_SETTING,
      (evt, payload: { enabled: boolean }) => {
        setChecked(payload.enabled);
      }
    );
  }, []);

  return (
    <>
      <ItemTitle>
        <Checkbox checked={checked} onChange={onChange} />
      </ItemTitle>
      <ItemContent>KoEn 활성화</ItemContent>
    </>
  );
}

export default Activator;
