import styled from 'styled-components';
import { IconButton } from './Input';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATH_ROOT, ROUTES_PATH_SETTING } from '../constant/Routes';

const TopBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100vw;
  height: 64px;
  padding: 16px;
  margin: unset;
  display: flex;
  justify-content: end;
  background-color: transparent;
`;

const TopBar = ({ isHome }: { isHome: boolean }) => {
  const navigate = useNavigate();
  const onClick = () => {
    if (isHome) {
      navigate(ROUTES_PATH_SETTING);
    } else {
      navigate(ROUTES_PATH_ROOT);
    }
  };
  return (
    <TopBarContainer>
      <IconButton
        src={isHome ? '/icons/setting.svg' : 'icons/close.svg'}
        onClick={onClick}
      />
    </TopBarContainer>
  );
};

export default TopBar;
