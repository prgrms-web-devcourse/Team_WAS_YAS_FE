import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import { Colors, FontSize, FontWeight } from '@/styles';
import { Container, Input, Button, Spinner } from '@/components';

const initialValues = {
  email: '',
  userName: '',
  nickName: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .strict(true)
    .trim('공백을 제거해주세요.')
    .email('이메일 형식으로 작성해주세요.')
    .max(255)
    .required('이메일을 입력해주세요.'),
  userName: Yup.string()
    .strict(true)
    .trim('공백을 제거해주세요.')
    .min(2, '이름은 최소 2글자 이상이어야 합니다.')
    .max(5, '이름은 5글자 이하까지만 가능합니다.')
    .required('이름을 입력해주세요.'),
  nickName: Yup.string()
    .strict(true)
    .trim('공백을 제거해주세요.')
    .min(2, '닉네임은 최소 2글자 이상이어야 합니다.')
    .max(12, '닉네임은 12글자 이하까지만 가능합니다.')
    .required('닉네임을 입력해주세요.'),
  password: Yup.string()
    .min(8, '비밀번호는 최소 8글자 이상이어야 합니다.')
    .max(15, '비밀번호는 최대 15글자 이하까지만 가능합니다.')
    .required('비밀번호를 입력해주세요.'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('확인 비밀번호를 입력해주세요.'),
});

const SignUpPage = (): JSX.Element => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    touched,
    values,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelper) => {
      const sleep = () => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(true), 2000);
        });
      };
      await sleep();
      console.log('제출', values);
      formikHelper.resetForm();
      formikHelper.setStatus({ success: true });
      formikHelper.setSubmitting(false);
      Swal.fire({
        icon: 'success',
        title: '🥳',
        text: 'YAS 회원이 되신것을 환영합니다.',
      });
    },
  });

  const transformBlur = (e: React.FormEvent & { target: HTMLInputElement }) => {
    setFieldValue(e.target.name, e.target.value.trim());
    handleBlur(e);
  };

  return (
    <StyledContainer navBar>
      <HeadText>지금 당장 YAS를 시작해볼까요?</HeadText>
      <SignInForm onSubmit={handleSubmit}>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="이메일"
          onChange={handleChange}
          onBlur={transformBlur}
          value={values.email}
        />
        <GuideText>{touched.email && errors.email}&nbsp;</GuideText>
        <Label htmlFor="userName">이름</Label>
        <Input
          id="userName"
          name="userName"
          type="text"
          placeholder="이름"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.userName}
        />
        <GuideText>{touched.userName && errors.userName}&nbsp;</GuideText>
        <Label htmlFor="nickName">닉네임</Label>
        <Input
          id="nickName"
          name="nickName"
          type="text"
          placeholder="닉네임"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.nickName}
        />
        <GuideText>{touched.nickName && errors.nickName}&nbsp;</GuideText>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        <GuideText>{touched.password && errors.password}&nbsp;</GuideText>
        <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
        <Input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.passwordConfirm}
        />
        <GuideText>
          {touched.passwordConfirm && errors.passwordConfirm}&nbsp;
        </GuideText>
        <StyledButton type="submit" disabled={isSubmitting}>
          가입하기
        </StyledButton>
      </SignInForm>
      {isSubmitting && <Spinner />}
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
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
  width: 100%;
  margin-bottom: 1rem;
`;

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

export default SignUpPage;
