import styled from "styled-components";
import { Checkbox } from "../../components/atoms/Checkbox";

const Body = styled.div`
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

const Container = styled.div`
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

const ItemBody = styled.div`
  width: 75%;
  margin-left: 10px;
`;

function Home() {
  return (
    <Body>
      <Container>
        <ItemTitle>
          <Checkbox />
        </ItemTitle>
        <ItemBody>KoEn 활성화</ItemBody>
      </Container>
    </Body>
  );
}

export default Home;
