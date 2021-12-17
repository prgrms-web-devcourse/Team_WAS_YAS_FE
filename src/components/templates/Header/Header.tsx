import styled from '@emotion/styled';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { IconButton, IconButtonProps } from '@/components';
import { Avatar } from '@mui/material';
import { Media, Colors } from '@/styles';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export type HeaderProps = React.ComponentProps<'header'>;

const Header = ({ ...props }: HeaderProps): JSX.Element => {
  const { data: user } = useSelector((state: RootState) => state.user);
  const [match, history] = [useRouteMatch(), useHistory()];
  const params = parseParams(match.url);

  return (
    <Container {...props}>
      <ContentContainer>
        <BackButton visible={params.length > 1 && history.length > 1} />
        <StyledAvatar
          src={user?.profileImage}
          on={params[0] === 'mypage' ? 1 : 0}
          onClick={() => {
            history.push('/mypage');
          }}
        />
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
  /* max-width: 768px; */
  width: 100%;
  height: 80px;
  margin: 0 auto;
`;

const BackButton = styled(IconButton.Back)<
  IconButtonProps & { visible: boolean }
>`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
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
  }s
`;

export default Header;
