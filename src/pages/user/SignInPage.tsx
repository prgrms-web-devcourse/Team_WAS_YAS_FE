import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import styled from '@emotion/styled';
import { Colors, Media, FontSize, FontWeight } from '@/styles';
import { Container, Header, IconButton, Input, Button } from '@/components';

const initialValues = {
  email: 'was@gmail.com',
  password: 'was',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup.string().max(255).required('Password is required'),
});

const SignInPage = (): JSX.Element => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    touched,
    values,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formikHelper) => {
      const onSuccess = () => {
        formikHelper.resetForm();
        formikHelper.setStatus({ success: true });
        formikHelper.setSubmitting(false);
        console.log('onSuccess');
      };

      const onFailure = () => {
        formikHelper.setStatus({ success: false });
        formikHelper.setSubmitting(false);
      };
      console.log('onFailure');
    },
  });

  return (
    <Container>
      <Header>
        <IconButton.UserProfile />
      </Header>
      <ContentContainer>
        <HeadText>지금 당장 YAS를 시작해볼까요?</HeadText>
        <SignInForm>
          <Filed>
            <Label>이메일</Label>
            <Input type="email" placeholder="이메일" />
            <GuideText>이메일을 입력해주세요.</GuideText>
          </Filed>
          <Filed>
            <Label>비밀번호</Label>
            <Input type="password" placeholder="비밀번호" />
            <GuideText>비밀번호를 입력해주세요.</GuideText>
          </Filed>
        </SignInForm>
        <StyledButton>입장하기</StyledButton>
        <StyledButton colorType="white">회원가입 하러가기</StyledButton>
      </ContentContainer>
    </Container>
  );
};

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 140px);
`;

const HeadText = styled.h1`
  margin-bottom: 80px;
  font-size: 24px;
  font-weight: ${FontWeight.bold};
  color: ${Colors.textPrimary};
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const Filed = styled.fieldset``;

const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: ${FontSize.base};
  color: ${Colors.textSecondary};
`;

const GuideText = styled.p`
  margin: 1rem 0;
  color: ${Colors.functionNegative};
`;

const StyledButton = styled(Button)`
  margin: 1rem 0;
`;

export default SignInPage;
