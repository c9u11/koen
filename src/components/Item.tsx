import { styled } from 'styled-components';

const Item = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
`;

const ItemTitle = styled.h2`
  font-size: 16px;
  display: flex;
  justify-content: end;
`;

const ItemContent = styled.div`
  width: 100%;
  font-size: 14px;
`;

const ItemLabel = styled.label`
  font-size: 14px;
  margin-left: 10px;
`;

export { Item, ItemTitle, ItemContent, ItemLabel };
