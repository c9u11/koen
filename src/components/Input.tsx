import { styled } from 'styled-components';

const Checkbox = styled.input.attrs({ type: 'checkbox' })``;

const TextInput = styled.input`
  cursor: text;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid #aaa;
  border-radius: 5px;
  margin-top: -4px;
`;

const TransparentButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  &:disabled {
    cursor: not-allowed;
  }
`;

const IconButton = styled.button<{ src: string }>`
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  width: 16px;
  height: 16px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    cursor: not-allowed;
  }
`;

export { Checkbox, TextInput, TransparentButton, IconButton };
