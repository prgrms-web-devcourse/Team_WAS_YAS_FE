import styled from '@emotion/styled';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import { Container, Button, Spinner } from '@/components';
import { useHistory } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, user as userStore, fetchUser } from '@/store';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const UserPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data: user, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleClickLogoutButton = () => {
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

  return (
    <StyledContainer navBar>
      <HeadText>프로필</HeadText>
      <StyledAvatar src={user ? user.profileImage : ''} />
      <ContentContainer>
        <FieldWrapper>
          <FieldText>이름</FieldText>
          <Text>{user ? user.name : ''}</Text>
        </FieldWrapper>
        <FieldWrapper>
          <FieldText>이메일</FieldText>
          <Text>{user ? user.email : ''}</Text>
        </FieldWrapper>
        <FieldWrapper>
          <FieldText>닉네임</FieldText>
          <Text>{user ? user.nickname : ''}</Text>
        </FieldWrapper>
      </ContentContainer>
      <ButtonWrapper>
        <Button
          onClick={() => {
            history.push(`/mypage/edit`);
          }}
        >
          수정하기
        </Button>
        <Button colorType="white" onClick={handleClickLogoutButton}>
          로그아웃
        </Button>
      </ButtonWrapper>
      {loading && <Spinner />}
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-bottom: 80px;
`;

const HeadText = styled.h1`
  margin-bottom: 80px;
  font-size: 24px;
  font-weight: ${FontWeight.bold};
  color: ${Colors.textPrimary};
`;

const FieldText = styled.p`
  margin: 1rem 0;
  color: ${Colors.textSecondary};

  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
  @media ${Media.md} {
    font-size: ${FontSize.base};
  }
  @media ${Media.lg} {
    font-size: ${FontSize.base};
  }
`;

const Text = styled.p`
  color: ${Colors.textPrimary};

  @media ${Media.sm} {
    font-size: ${FontSize.medium};
  }
  @media ${Media.md} {
    font-size: ${FontSize.large};
  }
  @media ${Media.lg} {
    font-size: ${FontSize.large};
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${Colors.pointLight};
  width: 200px;
  height: 200px;
  margin-bottom: 4rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  margin-bottom: 2rem;
`;

export default UserPage;
