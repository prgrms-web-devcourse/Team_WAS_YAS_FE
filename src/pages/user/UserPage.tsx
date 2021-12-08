import styled from '@emotion/styled';
import { Colors, FontSize, FontWeight } from '@/styles';
import { Container, Input, Button, Spinner } from '@/components';
import { useHistory } from 'react-router-dom';

const UserPage = (): JSX.Element => {
  const history = useHistory();

  const handleClickEditButton = () => {
    history.push(`/mypage/edit`);
  };

  return (
    <StyledContainer navBar>
      <HeadText>프로필</HeadText>
      <UserProfileImageContainer></UserProfileImageContainer>
      <ContentContainer>
        <FieldText>닉네임</FieldText>
        <Text>아이엠어보이</Text>
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
  width: 100%;
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
`;

const Text = styled.p`
  font-size: ${FontSize.large};
  color: ${Colors.textPrimary};
`;

export default UserPage;
