import { useEffect, useState } from 'react';
import { Checkbox } from './Input';
import { IpcRenderer } from 'electron';
import {
  IPC_CHANGED_IS_CHANGE_INPUT_SOURCE,
  IPC_SET_IS_CHANGE_INPUT_SOURCE
} from '../constant/Ipc';
import { ItemLabel } from './Item';
const Electron = window.require('electron');
const ipcRenderer: IpcRenderer = Electron.ipcRenderer;

export default function IsChangeInputSourceSetter() {
  const [checked, setChecked] = useState(true);
  const toggle = () => ipcRenderer.send(IPC_SET_IS_CHANGE_INPUT_SOURCE, !checked);

  useEffect(() => {
    // IS_CHAGNGE_INPUT_SOURCE가 변경되었을 때 이벤트를 받아서 checked 상태를 변경합니다.
    ipcRenderer.on(IPC_CHANGED_IS_CHANGE_INPUT_SOURCE, (
      evt: Electron.IpcRendererEvent,
      payload: boolean
    ) => {
      setChecked(payload);
    });

    ipcRenderer.send(IPC_SET_IS_CHANGE_INPUT_SOURCE);

    return () => {
      ipcRenderer.removeAllListeners(IPC_CHANGED_IS_CHANGE_INPUT_SOURCE);
    };
  }, []);

  return (
    <>
      <Checkbox id='isChangeInputSource' checked={checked} onChange={toggle} />
      <ItemLabel htmlFor='isChangeInputSource'>
        단축키 입력시 입력 소스 변경
      </ItemLabel>
    </>
  );
}
