import * as Yup from 'yup';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { Colors, FontSize, FontWeight } from '@/styles';
import { Container, Input, Button, Spinner } from '@/components';
import { useHistory } from 'react-router-dom';
import { userApi } from '@/apis';
import { useDispatch } from 'react-redux';
import { user as userStore } from '@/store';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(8, '비밀번호는 최소 8글자 이상이어야 합니다.')
    .max(20, '비밀번호는 최대 20글자 이하까지만 가능합니다.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/,
      '영문자, 숫자, 특수문자를 포함해야 합니다.',
    )
    .required('비밀번호를 입력해주세요.'),
  newPassword: Yup.string()
    .min(8, '비밀번호는 최소 8글자 이상이어야 합니다.')
    .max(20, '비밀번호는 최대 20글자 이하까지만 가능합니다.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/,
      '영문자, 숫자, 특수문자를 포함해야 합니다.',
    )
    .required('비밀번호를 입력해주세요.'),
  checkedNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], '비밀번호가 일치하지 않습니다.')
    .required('확인 비밀번호를 입력해주세요.'),
});

const PasswordEditPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    checkedNewPassword: '',
  };

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
        await userApi.updatePassword(
          values.currentPassword,
          values.newPassword,
        );
        sessionStorage.removeItem('YAS_USER_TOKEN');
        dispatch(userStore.actions.deleteUser());
        formikHelper.setStatus({ success: true });
        formikHelper.setSubmitting(false);
        Swal.fire({
          icon: 'success',
          title: '비밀번호가 수정되었습니다.',
          text: '다시 로그인을 진행해주세요.',
        }).then(() => {
          history.replace('/');
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: '비밀번호를 확인해주세요.',
          confirmButtonColor: Colors.point,
        });
      }
    },
  });

  return (
    <StyledContainer navBar>
      <HeadText>비밀번호 수정</HeadText>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="currentPassword">현재 비밀번호</Label>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          placeholder="현재 비밀번호"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.currentPassword}
        />
        <GuideText>
          {touched.currentPassword && errors.currentPassword}&nbsp;
        </GuideText>
        <Label htmlFor="newPassword">새로운 비밀번호</Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="새로운 비밀번호"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.newPassword}
        />
        <GuideText>{touched.newPassword && errors.newPassword}&nbsp;</GuideText>
        <Label htmlFor="checkedNewPassword">새로운 비밀번호 확인</Label>
        <Input
          id="checkedNewPassword"
          name="checkedNewPassword"
          type="password"
          placeholder="새로운 비밀번호 확인"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.checkedNewPassword ? values.checkedNewPassword : ''}
        />
        <GuideText>
          {touched.checkedNewPassword && errors.checkedNewPassword}&nbsp;
        </GuideText>
        <Button type="submit">수정완료</Button>
      </Form>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 2rem;
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

export default PasswordEditPage;
