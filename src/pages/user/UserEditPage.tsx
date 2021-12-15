import * as Yup from 'yup';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Colors, FontSize, FontWeight } from '@/styles';
import { Container, Input, Button, Spinner } from '@/components';
import { Avatar } from '@mui/material';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const validationSchema = Yup.object().shape({
  nickName: Yup.string()
    .strict(true)
    .trim('공백을 제거해주세요.')
    .min(2, '닉네임은 최소 2글자 이상이어야 합니다.')
    .max(12, '닉네임은 12글자 이하까지만 가능합니다.')
    .required('닉네임을 입력해주세요.'),
});

// TODO: API 연동시 파일처리 부분 리팩토링
const UserEditPage = (): JSX.Element => {
  const history = useHistory();
  const user = useSelector((state: RootState) => state.user);
  const inputRef = useRef<HTMLInputElement>(null);
  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    user.profileImage,
  );

  const initialValues = {
    nickName: user.nickname,
    profileImageFile: '',
  };

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

  const handleFileUploadButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    inputRef.current && inputRef?.current.click();
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    if (e.target.files === null) return;
    const file = e.target.files[0];
    // setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === `string`) setImageUrl(reader.result);
    };
    if (file) reader.readAsDataURL(file);
    setFieldValue('profileImageFile', e.target.files[0]);
  };

  return (
    <StyledContainer navBar>
      <HeadText>프로필 수정</HeadText>
      <Form onSubmit={handleSubmit}>
        <AvatarWrapper>
          <StyledAvatar src={imageUrl} />
        </AvatarWrapper>
        <ImageFileInputWrapper>
          <Label htmlFor="profileImageFile">프로필 이미지</Label>
          <ImageFileInput
            id="profileImageFile"
            name="profileImageFile"
            onBlur={handleBlur}
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
          />
          <Button
            type="button"
            colorType="white"
            onClick={handleFileUploadButton}
          >
            이미지 업로드
          </Button>
        </ImageFileInputWrapper>
        <NickNameInputWrapper>
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
        </NickNameInputWrapper>

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

const ImageFileInputWrapper = styled.div`
  margin-bottom: 2rem;
`;

const NickNameInputWrapper = styled.div`
  margin-bottom: 2rem;
`;

const ImageFileInput = styled.input`
  display: none;
`;

const GuideText = styled.p`
  margin: 1rem 0;
  color: ${Colors.functionNegative};
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${Colors.pointLight};
  width: 200px;
  height: 200px;
  margin-bottom: 4rem;
`;

export default UserEditPage;
