import { Button } from '@/components';
import styled from '@emotion/styled';
import React from 'react';
import { Colors, Media, FontSize } from '@/styles';
import { useHistory } from 'react-router-dom';

export type LoginGuideProps = React.ComponentProps<'div'>;

const LoginGuide = ({ ...props }): JSX.Element => {
  const history = useHistory();

  return (
    <Container>
      <EmojiText>💫</EmojiText>
      <Text>지금 당장 YAS를 시작해볼까요?</Text>
      <Button
        onClick={() => {
          history.push('/mypage/signin');
        }}
      >
        로그인하러 가기
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const EmojiText = styled.p`
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

const Text = styled.p`
  @media ${Media.sm} {
    font-size: ${FontSize.base};
  }
  @media ${Media.md} {
    font-size: ${FontSize.medium};
  }
  @media ${Media.lg} {
    font-size: ${FontSize.medium};
  }
`;

export default LoginGuide;
