import styled from '@emotion/styled';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';
import { Media, Colors } from '@/styles';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { logoWide } from '@/images';

export type HeaderProps = React.ComponentProps<'header'>;

const Header = ({ ...props }: HeaderProps): JSX.Element => {
  const { data: user } = useSelector((state: RootState) => state.user);
  const [match, history] = [useRouteMatch(), useHistory()];
  const params = parseParams(match.url);

  return (
    <Container {...props}>
      <ContentContainer>
        <Link to="/">
          <LogoWideImage alt="logo" src={logoWide} />
        </Link>
        <Aside>
          <IconButton
            onClick={() => {
              history.push('/onBoarding');
            }}
          >
            <HelpIcon />
          </IconButton>
          <StyledAvatar
            src={user?.profileImage}
            on={params[0] === 'mypage' ? 1 : 0}
            onClick={() => {
              history.push('/mypage');
            }}
          />
        </Aside>
      </ContentContainer>
    </Container>
  );
};

const parseParams = (path: string): string[] =>
  path.split('/').filter((param) => param);

const Container = styled.header`
  position: fixed;
  align-items: center;
  width: 100%;
  max-width: 768px;
  background-color: white;
  z-index: 100;

  @media ${Media.sm} {
    padding: 0 15px;
  }
  @media ${Media.md} {
    padding: 0 40px;
  }
  @media ${Media.lg} {
    padding: 0 40px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;

  @media ${Media.sm} {
    height: 56px;
  }
  @media ${Media.md} {
    height: 80px;
  }
  @media ${Media.lg} {
    height: 80px;
  }
`;

const StyledAvatar = styled(Avatar)<{ on: number }>`
  background-color: ${({ on }) => (on ? Colors.point : Colors.pointLight)};
  border: ${({ on }) => (on ? `3px solid ${Colors.point}` : null)};
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      background-color: ${Colors.backgroundButton};
    }
  }

  &:active {
    background-color: ${Colors.point};
  }

  @media ${Media.sm} {
    width: 32px;
    height: 32px;
  }
  @media ${Media.md} {
    width: 40px;
    height: 40px;
  }
  @media ${Media.lg} {
    width: 40px;
    height: 40px;
  }
`;

const Aside = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HelpIcon = styled(HelpOutlineRoundedIcon)`
  color: ${Colors.point};
  width: 32px;
  height: 32px;
`;

const LogoWideImage = styled.img`
  width: 88px;
  height: auto;
  @media (hover: hover) {
    &:hover {
      opacity: 0.8;
    }
  }
`;

export default Header;
