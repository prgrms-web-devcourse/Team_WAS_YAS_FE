import styled from '@emotion/styled';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import { Container, Button } from '@/components';
import { useHistory } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { userApi } from '@/apis';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { UserType } from '@/Models';

const UserPage = (): JSX.Element => {
  const history = useHistory();
  const [user, setUser] = useState<Omit<UserType, 'userId'>>({
    name: '',
    nickname: '',
    profileImage: '',
    email: '',
  });

  const handleClickEditButton = () => {
    history.push(`/mypage/edit`);
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await userApi.getUser();
      const user = response.data.data;
      console.log(user);
      if (!user) {
        Swal.fire({
          title: '🤯',
          text: '로그인을 하고 접근해주세요.',
          confirmButtonColor: Colors.point,
        }).then(() => {
          history.push('/login');
        });
        return;
      }
      setUser(user);
    };
    getUser();
  }, [history]);

  return (
    <StyledContainer navBar>
      <HeadText>프로필</HeadText>
      <StyledAvatar src={user.profileImage ? user.profileImage : ''} />
      <ContentContainer>
        <FieldText>닉네임</FieldText>
        <Text>{user.nickname}</Text>
      </ContentContainer>
      <Button onClick={handleClickEditButton}>수정하기</Button>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const StyledAvatar = styled(Avatar)`
  background-color: ${Colors.pointLight};
  width: 200px;
  height: 200px;
  margin-bottom: 4rem;
`;

export default UserPage;
