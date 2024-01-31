import { styled } from 'styled-components';

const CenterLayout = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 20px 50px;
  margin: unset;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;
  gap: 20px;
`;

const RelativeBox = styled.div`
  position: relative;
  display: flex;
`;

const AbsoluteBox = styled.div<{
  $top?: number;
  $right?: number;
  $bottom?: number;
  $left?: number;
}>`
  position: absolute;
  display: flex;
  top: ${({ $top }) => $top ?? 'unset'};
  right: ${({ $right }) => $right ?? 'unset'};
  bottom: ${({ $bottom }) => $bottom ?? 'unset'};
  left: ${({ $left }) => $left ?? 'unset'};
`;

export { CenterLayout, RelativeBox, AbsoluteBox };
