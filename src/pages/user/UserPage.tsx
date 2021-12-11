import styled from '@emotion/styled';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import { Container, Button } from '@/components';
import { useHistory } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { userDummy } from '@/Models';

const UserPage = (): JSX.Element => {
  const history = useHistory();

  const handleClickEditButton = () => {
    history.push(`/mypage/edit`);
  };

  return (
    <StyledContainer navBar>
      <HeadText>프로필</HeadText>
      <StyledAvatar
        src={userDummy.profileImageUrl ? userDummy.profileImageUrl : ''}
      />
      <ContentContainer>
        <FieldText>닉네임</FieldText>
        <Text>{userDummy.nickName}</Text>
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

const UserProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 6rem;
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
