import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { logoWide } from '@/images';
import styled from '@emotion/styled';
import { Avatar, IconButton } from '@mui/material';
import { Media, Colors, FontSize } from '@/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, user as userStore } from '@/store';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import BackButton from './BackButton';
import { UserToolBox } from '@/components';

export type HeaderProps = React.ComponentProps<'header'>;

const Header = ({ ...props }: HeaderProps): JSX.Element => {
  const [userToolBoxVisible, setUserToolBoxVisible] = useState<boolean>(false);
  const { data: user } = useSelector((state: RootState) => state.user);
  const [match, history] = [useRouteMatch(), useHistory()];
  const params = parseParams(match.url);
  const dispatch = useDispatch();

  const handleClickLogOutButton = () => {
    Swal.fire({
      icon: 'question',
      text: '정말 로그아웃 하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: Colors.point,
      cancelButtonColor: Colors.functionNegative,
      confirmButtonText: '네',
      cancelButtonText: '아니오',
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('YAS_USER_TOKEN');
        dispatch(userStore.actions.deleteUser());
        history.replace('/');
        Swal.fire({
          icon: 'success',
          text: '👋🏻 로그아웃 되었습니다.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleClickBackButton = () => {
    history.goBack();
  };

  const handleCloseUserToolBox = () => {
    setUserToolBoxVisible(false);
  };

  const handleClickUserButton = () => {
    history.push('/mypage');
  };

  return (
    <Container {...props}>
      <ContentContainer>
        <LeftAside>
          {params.length > 1 && history.length > 1 ? (
            <BackButton onClick={handleClickBackButton} visible />
          ) : (
            <>
              <Link to="/">
                <LogoWideImage alt="logo" src={logoWide} />
              </Link>
              <IconButton
                onClick={() => {
                  history.push('/onboarding');
                }}
              >
                <HelpIcon />
              </IconButton>
            </>
          )}
        </LeftAside>
        <RightAside>
          {user ? (
            <>
              <StyledAvatar
                src={user?.profileImage}
                on={params[0] === 'mypage' ? 1 : 0}
                onClick={() => {
                  setUserToolBoxVisible(true);
                }}
              />
            </>
          ) : (
            <Link to="/mypage/signin">
              <Text>로그인</Text>
            </Link>
          )}
          <StyledUserToolBox
            visible={userToolBoxVisible}
            onClose={handleCloseUserToolBox}
            onClickUserButton={handleClickUserButton}
            onClickSignOutButton={handleClickLogOutButton}
          />
        </RightAside>
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
  border: ${({ on }) => (on ? `2px solid ${Colors.point}` : null)};
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      background-color: ${Colors.backgroundButton};
      opacity: 0.8;
    }
  }

  &:active {
    background-color: ${Colors.point};
  }

  @media ${Media.sm} {
    width: 36px;
    height: 36px;
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

const LeftAside = styled.div`
  display: flex;
  align-items: center;
`;

const RightAside = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HelpIcon = styled(HelpOutlineRoundedIcon)`
  color: ${Colors.pointLight};
  width: 32px;
  height: 32px;
`;

const LogoWideImage = styled.img`
  align-self: flex-end;
  margin-top: 4px;
  width: 88px;
  height: auto;
  @media (hover: hover) {
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Text = styled.p`
  color: ${Colors.textPrimary};
  font-size: ${FontSize.small};

  @media (hover: hover) {
    &:hover {
      color: ${Colors.pointLight};
    }
  }

  &:active {
    color: ${Colors.point};
  }
`;

const StyledUserToolBox = styled(UserToolBox)`
  position: absolute;
  z-index: 1;

  @media ${Media.sm} {
    top: 3rem;
    right: 1rem;
  }
  @media ${Media.md} {
    top: 4rem;
    right: 2rem;
  }
  @media ${Media.lg} {
    top: 4rem;
    right: 2rem;
  }
`;

export default Header;
