import { useEffect, useState } from 'react';
import { TransparentButton } from './Input';
import { AbsoluteBox, RelativeBox } from './Layout';
import { Item, ItemContent, ItemTitle } from './Item';
import { Condition, ConditionTextInput, Conditions } from './Condition';
import { keyMap } from '../constant/KeyMap';
import {
  IPC_SETTING_END,
  IPC_SETTING_START,
  IPC_SET_SHORTCUT,
  IPC_CHANGED_SHORTCUT
} from '../constant/Ipc';
import { IpcRenderer } from 'electron';
const Electron = window.require('electron');
const ipcRenderer: IpcRenderer = Electron.ipcRenderer;

interface Shortcut {
  Key: string;
  Alt: boolean;
  Control: boolean;
  Meta: boolean;
  Shift: boolean;
}
const DEFAULT_SHORTCUT: Shortcut = {
  Key: '',
  Alt: false,
  Control: false,
  Meta: false,
  Shift: false
};
function ShortcutSetter() {
  const [shortcut, setShortcut] =
    useState<Shortcut>(DEFAULT_SHORTCUT);

  const [keyCondition, setKeyCondition] = useState(false);
  const [modifierCondition, setModifierCondition] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = keyMap[e.code];
    setShortcut({
      Key: ['Alt', 'Control', 'Meta', 'Shift'].indexOf(key) === -1 ? key : '',
      Alt: e.altKey,
      Control: e.ctrlKey,
      Meta: e.metaKey,
      Shift: e.shiftKey
    });
  };

  const startSetting = () => {
    ipcRenderer.send(IPC_SETTING_START);
    setIsSetting(true);
    setShortcut(DEFAULT_SHORTCUT);
  };

  const saveSetting = () => {
    ipcRenderer.send(IPC_SET_SHORTCUT, shortcutToString(shortcut));
    ipcRenderer.send(IPC_SETTING_END);
  }
  const cancelSetting = () => {
    ipcRenderer.send(IPC_SET_SHORTCUT);
    ipcRenderer.send(IPC_SETTING_END);
  }

  const shortcutToString = (shortcut: Shortcut) => {
    const shortcutArray = [];
    if (shortcut.Alt) shortcutArray.push('Alt');
    if (shortcut.Control) shortcutArray.push('Control');
    if (shortcut.Meta) shortcutArray.push('Meta');
    if (shortcut.Shift) shortcutArray.push('Shift');
    if (shortcut.Key !== '') shortcutArray.push(shortcut.Key);
    return shortcutArray.join(' + ');
  };
  const shortcutToObject = (shortcut: string) => {
    const shortcutObject = {
      Key: '',
      Alt: false,
      Control: false,
      Meta: false,
      Shift: false
    };
    shortcut.split(' + ').forEach((key: string) => {
      if (
        key === 'Alt' ||
        key === 'Control' ||
        key === 'Meta' ||
        key === 'Shift'
      )
        shortcutObject[key] = true;
      else shortcutObject.Key = key;
    });
    return shortcutObject;
  };

  useEffect(() => {
    // SHORTCUT이 변경되었을 때 이벤트를 받아서 shortcut 상태를 변경합니다.
    ipcRenderer.on(IPC_CHANGED_SHORTCUT, (
      evt: Electron.IpcRendererEvent,
      payload: string
    ) => {
      setShortcut(shortcutToObject(payload));
      setIsSetting(false);
    });

    ipcRenderer.send(IPC_SET_SHORTCUT);

    return () => {
      ipcRenderer.removeAllListeners(IPC_CHANGED_SHORTCUT);
    };
  }, []);

  useEffect(() => {
    if (shortcut.Key !== '') setKeyCondition(true);
    else setKeyCondition(false);
  }, [shortcut.Key]);

  useEffect(() => {
    if (shortcut.Alt || shortcut.Control || shortcut.Meta || shortcut.Shift)
      setModifierCondition(true);
    else setModifierCondition(false);
  }, [shortcut.Alt, shortcut.Control, shortcut.Meta, shortcut.Shift]);

  return (
    <Item>
      <ItemTitle>단축키 설정</ItemTitle>
      <ItemContent>
        <RelativeBox style={{ width: '100%' }}>
          <ConditionTextInput
            value={shortcutToString(shortcut)}
            placeholder='새 단축키를 입력하세요'
            readOnly
            onClick={startSetting}
            onKeyDown={onKeyDown}
            $changed={keyCondition || modifierCondition}
            $satisfied={keyCondition && modifierCondition}
          ></ConditionTextInput>
          {isSetting && (
            <AbsoluteBox $top={0} $right={0}>
              <TransparentButton
                type='button'
                disabled={!(keyCondition && modifierCondition)}
                onClick={saveSetting}
              >
                저장
              </TransparentButton>
              <TransparentButton type='button' onClick={cancelSetting}>
                취소
              </TransparentButton>
            </AbsoluteBox>
          )}
        </RelativeBox>
        {
          <Conditions>
            <Condition $satisfied={keyCondition}>일반 키 1개 사용</Condition>
            <Condition $satisfied={modifierCondition}>
              수정 키 1개 이상 사용
              <Conditions>
                <Condition $satisfied={shortcut.Alt}>Alt</Condition>
                <Condition $satisfied={shortcut.Control}>Control</Condition>
                <Condition $satisfied={shortcut.Meta}>Meta (Command)</Condition>
                <Condition $satisfied={shortcut.Shift}>Shift</Condition>
              </Conditions>
            </Condition>
          </Conditions>
        }
      </ItemContent>
    </Item>
  );
}

export default ShortcutSetter;
