import { Button } from '@/components';
import styled from '@emotion/styled';
import React from 'react';
import { Colors, Media, FontSize, FontWeight } from '@/styles';
import { useHistory } from 'react-router-dom';
import { logo } from '@/images';

export type LoginGuideProps = React.ComponentProps<'div'>;

const LoginGuide = ({ ...props }: LoginGuideProps): JSX.Element => {
  const history = useHistory();

  return (
    <Container {...props}>
      <Img src={logo} alt="로고 이미지" />
      <Text>지금 당장 YAS를 시작해볼까요?</Text>
      <StyledButton
        onClick={() => {
          history.push('/mypage/signin');
        }}
      >
        로그인하러 가기
      </StyledButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Img = styled.img`
  margin: 72px 0 20px 0;

  @media ${Media.sm} {
    font-size: 64px;
  }
  @media ${Media.md} {
    font-size: 80px;
  }
  @media ${Media.lg} {
    font-size: 80px;
  }
`;

const Text = styled.p`
  color: ${Colors.textSecondary};
  font-weight: ${FontWeight.medium};
  margin: 2rem;
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

const StyledButton = styled(Button)`
  margin: 2rem 0;

  @media ${Media.sm} {
    width: 200px;
  }
  @media ${Media.md} {
    width: 320px;
  }
  @media ${Media.lg} {
    width: 320px;
  }
`;

export default LoginGuide;
