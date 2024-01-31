import { styled } from 'styled-components';
import { TextInput } from './Input';

const Conditions = styled.ul``;
const Condition = styled.li<{ $satisfied: boolean }>`
  color: ${(props) => (props.$satisfied ? '#333' : '#999')};
  list-style-type: ${(props) => (props.$satisfied ? "'✓ '" : '')};
`;

const ConditionTextInput = styled(TextInput)<{
  $changed: boolean;
  $satisfied: boolean;
}>`
  &:focus {
    border-color: ${(props) => {
      if (props.$satisfied) return '#28c840 !important';
      if (props.$changed) return '#febc2e !important';
      return '#aaa';
    }};
    outline: none;
  }
`;

export { Conditions, Condition, ConditionTextInput };
