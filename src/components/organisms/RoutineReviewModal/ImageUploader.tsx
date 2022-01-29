import { camera } from '@/images';
import { Colors, FontSize, Media } from '@/styles';
import styled from '@emotion/styled';
import React, { ChangeEvent } from 'react';

export interface ImageProps {
  routineImages: { routineStatusImageId: number | string; imageUrl: string }[];
  onImageChange: (fileList: File[]) => void;
  onImageDelete: (routineStatusImageId: string | number) => void;
}

const ImageUploader = ({
  routineImages,
  onImageChange,
  onImageDelete,
}: ImageProps): JSX.Element => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = [...e.target.files];
      onImageChange && onImageChange(fileList);
      e.target.value = '';
    }
  };

  const handleImageDelete = (routineStatusImageId: string | number) => {
    onImageDelete && onImageDelete(routineStatusImageId);
  };

  return (
    <>
      {routineImages && (
        <Ul
          style={{
            justifyContent: `${routineImages.length ? 'flex-start' : 'center'}`,
          }}
        >
          {routineImages.map(({ routineStatusImageId, imageUrl }) => (
            <Li key={routineStatusImageId}>
              <Image src={imageUrl} alt="후기 사진" />
              <DeleteButton
                onClick={() => handleImageDelete(routineStatusImageId)}
              >
                x
              </DeleteButton>
            </Li>
          ))}
          <ImageContainer htmlFor="image">
            <CameraIcon src={camera} alt="사진 업로드" />
            <Input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </ImageContainer>
        </Ul>
      )}
    </>
  );
};

export default ImageUploader;

const Input = styled.input`
  display: none;
`;

const ImageContainer = styled.label`
  border: 3px dashed ${Colors.point};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media ${Media.sm} {
    margin: 1rem 0.5rem;
    height: 100px;
    min-width: 80px;
  }
  @media ${Media.md} {
    margin: 1rem 0.5rem;
    height: 140px;
    min-width: 140px;
  }
  @media ${Media.lg} {
    margin: 1rem 0.5rem;
    height: 140px;
    min-width: 140px;
  }
`;

const CameraIcon = styled.img`
  cursor: pointer;
  @media ${Media.sm} {
    width: 24px;
  }
  @media ${Media.md} {
    width: 32px;
  }
  @media ${Media.lg} {
    width: 32px;
  }
`;

const Ul = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow-x: scroll;
  margin: 0.5rem 0;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Li = styled.li`
  position: relative;
  margin: 0 0.5rem;
`;

const Image = styled.img`
  border-radius: 8px;
  @media ${Media.sm} {
    height: 100px;
    margin: 0.5rem 0;
  }
  @media ${Media.md} {
    height: 140px;
    margin: 0.5rem 0;
  }
  @media ${Media.lg} {
    height: 140px;
    margin: 0.5rem 0;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.6rem;
  right: 0.2rem;
  background-color: ${Colors.backgroundButton};
  border-radius: 50%;
  line-height: 3px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: ${Colors.textSecondary};
  text-align: center;
  vertical-align: center;
  @media ${Media.sm} {
    width: 24px;
    height: 24px;
    font-size: ${FontSize.small};
  }
  @media ${Media.md} {
    width: 32px;
    height: 32px;
    font-size: ${FontSize.medium};
  }
  @media ${Media.lg} {
    width: 32px;
    height: 32px;
    font-size: ${FontSize.medium};
  }
  @media (hover: hover) {
    :hover {
      color: ${Colors.textPrimary};
      background-color: ${Colors.pointLight};
    }
  }
`;
