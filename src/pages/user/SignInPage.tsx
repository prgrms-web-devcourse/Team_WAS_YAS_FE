import * as Yup from 'yup';
import { useFormik } from 'formik';
import styled from '@emotion/styled';
import { Colors, FontSize, FontWeight } from '@/styles';
import { Container, Input, Button } from '@/components';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('이메일 형식으로 작성해주세요.')
    .max(255)
    .required('이메일을 입력해주세요.'),
  password: Yup.string()
    .min(8, '비밀번호는 최소 8글자 이상이어야 합니다.')
    .max(255)
    .required('비밀번호를 입력해주세요.'),
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
    onSubmit: (values) => {
      console.log('제출', values);
    },
  });

  return (
    <Container navBar>
      <ContentContainer>
        <HeadText>지금 당장 YAS를 시작해볼까요?</HeadText>
        <SignInForm onSubmit={handleSubmit}>
          <Filed>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="이메일"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <GuideText>{touched.email && errors.email}&nbsp;</GuideText>
          </Filed>
          <Filed>
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
          </Filed>
          <StyledButton type="submit">입장하기</StyledButton>
          <StyledButton colorType="white">회원가입 하러가기</StyledButton>
        </SignInForm>
      </ContentContainer>
      <ContentContainer>
        <HeadText>지금 당장 YAS를 시작해볼까요?</HeadText>
        <SignInForm onSubmit={handleSubmit}>
          <Filed>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="이메일"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <GuideText>{touched.email && errors.email}&nbsp;</GuideText>
          </Filed>
          <Filed>
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
          </Filed>
          <StyledButton type="submit">입장하기</StyledButton>
          <StyledButton colorType="white">회원가입 하러가기</StyledButton>
        </SignInForm>
      </ContentContainer>
      <ContentContainer>
        <HeadText>지금 당장 YAS를 시작해볼까요?</HeadText>
        <SignInForm onSubmit={handleSubmit}>
          <Filed>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="이메일"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <GuideText>{touched.email && errors.email}&nbsp;</GuideText>
          </Filed>
          <Filed>
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
          </Filed>
          <StyledButton type="submit">입장하기</StyledButton>
          <StyledButton colorType="white">회원가입 하러가기</StyledButton>
        </SignInForm>
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
  margin-top: 40px;
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
