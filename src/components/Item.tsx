import { styled } from "styled-components";

const Item = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: right;
  align-items: flex-start;
`;

const ItemTitle = styled.div`
  display: flex;
  justify-content: end;
  width: 25%;
`;

const ItemContent = styled.div`
  width: 75%;
  margin-left: 10px;
`;

export { Item, ItemTitle, ItemContent };
