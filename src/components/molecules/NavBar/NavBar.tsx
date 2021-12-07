import { RoundedButton } from '@/components';
import { Media } from '@/styles';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';

interface clickedNav {
  community: boolean;
  home: boolean;
  analysis: boolean;
}

const NavBar = (): JSX.Element => {
  const location = useLocation();
  const pathname: string = location.pathname.split('/')[1];
  const isClicked: clickedNav = {
    community: pathname === 'community' ? true : false,
    home: pathname === 'routine' || pathname === '' ? true : false,
    analysis: pathname === 'analysis' ? true : false,
  };

  return (
    <NavBarContainer>
      <Link to="/community">
        <RoundedButton.Community
          className="community"
          active={isClicked.community}
        />
      </Link>

      <Link to="/routine">
        <RoundedButton.Home className="home" active={isClicked.home} />
      </Link>

      <Link to="/analysis">
        <RoundedButton.Analysis
          className="analysis"
          active={isClicked.analysis}
        />
      </Link>
    </NavBarContainer>
  );
};

const NavBarContainer = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-width: 768px;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1;
  background-color: white;

  @media ${Media.sm} {
    height: 56px;
  }
  @media ${Media.md} {
    height: 100px;
  }
  @media ${Media.lg} {
    height: 100px;
  }
`;

export default NavBar;
