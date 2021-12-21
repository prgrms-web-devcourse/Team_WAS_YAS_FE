import { RoundedButton } from '@/components';
import { Colors, Media, FontSize, FontWeight } from '@/styles';
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
      <NavLink to="/routine">
        <RoundedButton.Home className="home" active={isClicked.home} />
        <Text>마이루틴</Text>
      </NavLink>

      <NavLink to="/community">
        <RoundedButton.Community
          className="community"
          active={isClicked.community}
        />
        <Text>커뮤니티</Text>
      </NavLink>

      <NavLink to="/analysis">
        <RoundedButton.Analysis
          className="analysis"
          active={isClicked.analysis}
        />
        <Text>루틴요약</Text>
      </NavLink>
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
    height: 64px;
  }
  @media ${Media.md} {
    height: 100px;
  }
  @media ${Media.lg} {
    height: 100px;
  }
`;

const NavLink = styled(Link)`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  margin-top: 0.5rem;
  color: ${Colors.textTertiary};
  font-weight: ${FontWeight.medium};

  @media ${Media.sm} {
    font-size: ${FontSize.micro};
  }
  @media ${Media.md} {
    font-size: ${FontSize.small};
  }
  @media ${Media.lg} {
    font-size: ${FontSize.small};
  }
`;

export default NavBar;
