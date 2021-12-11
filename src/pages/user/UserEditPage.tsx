import * as Yup from 'yup';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { userDummy } from '@/Models';
import { Colors, FontSize, FontWeight } from '@/styles';
import {
  Container,
  Input,
  Button,
  Spinner,
  UserProfileImage,
} from '@/components';

const initialValues = {
  nickName: userDummy.nickName,
  imageFile: '',
};

const validationSchema = Yup.object().shape({
  nickName: Yup.string()
    .strict(true)
    .trim('공백을 제거해주세요.')
    .min(2, '닉네임은 최소 2글자 이상이어야 합니다.')
    .max(12, '닉네임은 12글자 이하까지만 가능합니다.')
    .required('닉네임을 입력해주세요.'),
});

const UserEditPage = (): JSX.Element => {
  const history = useHistory();
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    touched,
    values,
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
        title: '수정되었습니다.',
      }).then(() => {
        history.push(`/mypage`);
      });
    },
  });

  const handleChangeImage = (
    e: React.ChangeEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    if (e.target.files === null) return;
    setFieldValue('imageFile', e.target.files[0]);
  };

  return (
    <StyledContainer navBar>
      <HeadText>프로필 수정</HeadText>
      <Form onSubmit={handleSubmit}>
        <UserProfileImageContainer>
          <UserProfileImage
            edit
            id="imageUrl"
            name="imageUrl"
            src={userDummy.profileImageUrl}
            onChange={handleChangeImage}
            onBlur={handleBlur}
          />
        </UserProfileImageContainer>
        <Label htmlFor="nickName">닉네임</Label>
        <Input
          id="nickName"
          name="nickName"
          type="text"
          placeholder="변경할 닉네임을 작성해주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.nickName}
        />
        <GuideText>{touched.nickName && errors.nickName}&nbsp;</GuideText>
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
  height: 100vh;
`;

const UserProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 6rem;
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
  margin-bottom: 2rem;
`;

export default UserEditPage;
