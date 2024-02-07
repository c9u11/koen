import { useEffect, useState } from 'react';
import { TransparentButton } from './Input';
import { AbsoluteBox, RelativeBox } from './Layout';
import { Item, ItemContent, ItemTitle } from './Item';
import { Condition, ConditionTextInput, Conditions } from './Condition';
import { keyMap } from '../constant/KeyMap';
import {
  IPC_DEFAULT_SETTING,
  IPC_SETTING_END,
  IPC_SETTING_START,
  IPC_SET_SHORTCUT
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
  const [currentShortcut, setCurrentShortcut] =
    useState<Shortcut>(DEFAULT_SHORTCUT);
  const [shortcut, setShortcut] = useState<Shortcut>(DEFAULT_SHORTCUT);

  const [keyCondition, setKeyCondition] = useState(false);
  const [modifierCondition, setModifierCondition] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = keyMap[e.code];
    console.log(e);
    setShortcut({
      Key: ['Alt', 'Control', 'Meta', 'Shift'].indexOf(key) === -1 ? key : '',
      Alt: e.altKey,
      Control: e.ctrlKey,
      Meta: e.metaKey,
      Shift: e.shiftKey
    });
  };

  const initShortcut = () => {
    ipcRenderer.send(IPC_SETTING_START);
    setShortcut(DEFAULT_SHORTCUT);
    setIsSetting(true);
  };

  const restoreShortcuts = () => {
    ipcRenderer.send(IPC_SETTING_END);
    setShortcut(currentShortcut);
    setIsSetting(false);
  };

  const saveShortcuts = () => {
    ipcRenderer.send(IPC_SET_SHORTCUT, shortcutToString(shortcut));
    setCurrentShortcut(shortcut);
    setIsSetting(false);
  };

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

  ipcRenderer.on(IPC_DEFAULT_SETTING, (e, props) => {
    const currentShortcut = shortcutToObject(props.defaultShortcutKey);
    setCurrentShortcut(currentShortcut);
    setShortcut(currentShortcut);
  });

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
      <ItemTitle>단축키 설정 :</ItemTitle>
      <ItemContent>
        <RelativeBox>
          <ConditionTextInput
            value={shortcutToString(shortcut)}
            placeholder='새 단축키를 입력하세요'
            readOnly
            onClick={initShortcut}
            onKeyDown={onKeyDown}
            $changed={keyCondition || modifierCondition}
            $satisfied={keyCondition && modifierCondition}
          ></ConditionTextInput>
          {isSetting && (
            <AbsoluteBox $top={0} $right={0}>
              <TransparentButton
                type='button'
                disabled={!(keyCondition && modifierCondition)}
                onClick={saveShortcuts}
              >
                저장
              </TransparentButton>
              <TransparentButton type='button' onClick={restoreShortcuts}>
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
