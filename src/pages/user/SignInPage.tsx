import * as Yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import { Colors, FontSize, FontWeight } from '@/styles';
import { Container, Input, Button, Spinner } from '@/components';
import { userApi } from '@/apis';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUser } from '@/store';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .strict(true)
    .trim('공백을 제거해주세요.')
    .email('이메일 형식으로 작성해주세요.')
    .max(255)
    .required('이메일을 입력해주세요.'),
  password: Yup.string()
    .min(8, '비밀번호는 최소 8글자 이상이어야 합니다.')
    .max(20, '비밀번호는 최대 20글자 이하까지만 가능합니다.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/,
      '영문자, 숫자, 특수문자를 포함해야 합니다.',
    )
    .required('비밀번호를 입력해주세요.'),
});

const SignInPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
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
    onSubmit: async (values, formikHelper) => {
      try {
        const loginResponse = await userApi.signIn(values);
        const token = loginResponse.data.data.token;
        sessionStorage.setItem('YAS_USER_TOKEN', JSON.stringify(token));
        dispatch(fetchUser());
        formikHelper.setStatus({ success: true });
        formikHelper.setSubmitting(false);
        Swal.fire({
          icon: 'success',
          text: '🎉 환영합니다! 🎉',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          history.push('/');
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: `로그인에 실패하였습니다. 로그인 정보를 확인해주세요.`,
          confirmButtonColor: Colors.point,
        });
      }
    },
  });

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
          onBlur={handleBlur}
          value={values.email}
        />
        <GuideText>{touched.email && errors.email}&nbsp;</GuideText>
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
        <StyledButton type="submit" disabled={isSubmitting}>
          입장하기
        </StyledButton>
        <StyledButton
          type="button"
          colorType="white"
          onClick={() => {
            history.push('/mypage/signup');
          }}
        >
          회원가입 하러가기
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
  height: 100%;
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

export default SignInPage;
