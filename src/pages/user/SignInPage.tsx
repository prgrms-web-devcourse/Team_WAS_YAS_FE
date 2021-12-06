import React from 'react';
import { Container, Header, IconButton, Text, Input } from '@/components';

const SignInPage = (): JSX.Element => {
  return (
    <Container>
      <Header>
        <IconButton.UserProfile />
      </Header>
      <Text>지금 당장 YAS를 시작해볼까요?</Text>
    </Container>
  );
};

export default SignInPage;
