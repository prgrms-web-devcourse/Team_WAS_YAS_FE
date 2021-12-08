import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import { Media } from '@/styles';
import UserProfileIcon from './UserProfileIcon';
import CameraIcon from './CameraIcon';
import { Spinner } from '@/components';

export interface UserProfileImageProps extends React.ComponentProps<'div'> {
  edit?: boolean;
  src?: string;
}

const UserProfileImage = ({
  edit,
  src,
  onClick,
  ...props
}: UserProfileImageProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(src);

  const handleClickUserProfile = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!edit) return;
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
    onClick && onClick(e);
  };

  const handleInputChange = async (
    e: React.ChangeEvent & { target: HTMLInputElement },
  ) => {
    if (e.target.files === null) return;
    setLoading(true);
    const file = e.target.files[0];
    // setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === `string`) setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setLoading(false);
  };

  return (
    <Container edit={edit} onClick={handleClickUserProfile} {...props}>
      {imageUrl ? (
        <Image src={imageUrl} alt="유저 이미지" />
      ) : (
        <UserProfileIcon />
      )}
      {edit && <ImageAddIcon />}
      <ImageFileInput
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
      />
      {loading && <Spinner />}
    </Container>
  );
};

const Container = styled.div<UserProfileImageProps>`
  position: relative;
  display: inline-block;
  cursor: ${({ edit }) => (edit ? 'pointer' : 'null')};
`;

const Image = styled.img`
  border-radius: 50%;

  @media ${Media.sm} {
    width: 120px;
    height: 120px;
  }
  @media ${Media.md} {
    width: 200px;
    height: 200px;
  }
  @media ${Media.lg} {
    width: 200px;
    height: 200px;
  }
`;

const ImageAddIcon = styled(CameraIcon)`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
`;

const ImageFileInput = styled.input`
  display: none;
`;

export default UserProfileImage;
