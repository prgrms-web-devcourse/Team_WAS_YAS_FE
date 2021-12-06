import React from 'react';
import { Container, Header, IconButton, Input, Button } from '@/components';
import styled from '@emotion/styled';
import { Colors, Media, FontSize } from '@/styles';

const SignInPage = (): JSX.Element => {
  return (
    <Container>
      <Header>
        <IconButton.UserProfile />
      </Header>
      <HeadText>지금 당장 YAS를 시작해볼까요?</HeadText>
      <SignInForm>
        <Label>이메일</Label>
        <Input type="text" placeholder="이메일" />
        <Label>비밀번호</Label>
        <Input type="password" placeholder="비밀번호" />
      </SignInForm>
      <Button>입장하기</Button>
      <Button colorType="white">회원가입 하러가기</Button>
    </Container>
  );
};

const HeadText = styled.h1`
  font-size: 24px;
  color: ${Colors.textPrimary};
`;

const SignInForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: ${FontSize.base};
  color: ${Colors.textSecondary};
`;

export default SignInPage;
