import { useEffect, useState } from 'react';
import {
  IPC_CHANGED_ENABLED,
  IPC_DEFAULT_SETTING,
  IPC_SET_ENABLED
} from '../constant/ipc';
import { IpcRenderer } from 'electron';
import styled from 'styled-components';
import { CenterLayout } from './Layout';
const Electron = window.require('electron');
const ipcRenderer: IpcRenderer = Electron.ipcRenderer;

const HomeBackground = styled(CenterLayout)<{ $checked: boolean }>`
  background: ${({ $checked }) =>
    $checked
      ? 'radial-gradient(circle at 50% 50%,#aaa 0%,#000 100%)'
      : 'radial-gradient(circle at 50% 50%,#222 0%,#000 100%)'};
`;
const Container = styled.div`
  cursor: pointer;
  width: 128px;
  height: 128px;
  overflow: hidden;
  border-radius: 10px;
  background-color: transparent;
`;
const Icon = styled.img<{ $checked: boolean }>`
  width: 100%;
  height: 100%;
  &:active {
    transform: translateY(5px);
  }
  filter: ${({ $checked }) => ($checked ? 'contrast(0.9)' : 'brightness(0.7)')};
`;

function Activator() {
  const [checked, setChecked] = useState(true);
  const toggle = () => {
    ipcRenderer.send(IPC_SET_ENABLED, !checked);
  };

  useEffect(() => {
    const handleEnabled = (
      evt: Electron.IpcRendererEvent,
      payload: boolean
    ) => {
      console.log(evt, payload);
      setChecked(payload);
    };

    ipcRenderer.on(IPC_CHANGED_ENABLED, handleEnabled);
    ipcRenderer.on(IPC_DEFAULT_SETTING, handleEnabled);

    return () => {
      ipcRenderer.removeListener(IPC_CHANGED_ENABLED, handleEnabled);
      ipcRenderer.removeListener(IPC_DEFAULT_SETTING, handleEnabled);
    };
  }, []);

  return (
    <HomeBackground $checked={checked}>
      <Container>
        <Icon
          src={`${process.env.PUBLIC_URL}/assets/icons/png/512x512.png`}
          onClick={toggle}
          $checked={checked}
        />
      </Container>
    </HomeBackground>
  );
}

export default Activator;
