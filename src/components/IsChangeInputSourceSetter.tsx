import { useEffect, useState } from 'react';
import { Checkbox } from './Input';
import { IpcRenderer } from 'electron';
import {
  IPC_CHANGED_IS_CHANGE_INPUT_SOURCE,
  IPC_DEFAULT_SETTING,
  IPC_SET_IS_CHANGE_INPUT_SOURCE
} from '../constant/ipc';
import { ItemLabel } from './Item';
const Electron = window.require('electron');
const ipcRenderer: IpcRenderer = Electron.ipcRenderer;

export default function IsChangeInputSourceSetter() {
  const [checked, setChecked] = useState(true);
  const toggle = () => setChecked(!checked);

  useEffect(() => {
    ipcRenderer.on(
      IPC_CHANGED_IS_CHANGE_INPUT_SOURCE,
      (evt, payload: boolean) => {
        setChecked(payload);
      }
    );

    ipcRenderer.on(
      IPC_DEFAULT_SETTING,
      (evt, payload: { isChangeInputSource: boolean }) => {
        setChecked(payload.isChangeInputSource);
      }
    );
  }, []);

  useEffect(() => {
    ipcRenderer.send(IPC_SET_IS_CHANGE_INPUT_SOURCE, checked);
  }, [checked]);

  return (
    <>
      <Checkbox id='isChangeInputSource' checked={checked} onChange={toggle} />
      <ItemLabel htmlFor='isChangeInputSource'>
        단축키 입력시 입력 소스 변경
      </ItemLabel>
    </>
  );
}
