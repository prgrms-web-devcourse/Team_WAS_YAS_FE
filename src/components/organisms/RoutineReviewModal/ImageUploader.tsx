import { IconButton } from '@/components';
import { camera } from '@/images';
import { Colors, Media } from '@/styles';
import styled from '@emotion/styled';
import React, { ChangeEvent, useState } from 'react';
const ImageUploader = (): JSX.Element => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [urlList, setUrlList] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFileList = [...e.target.files];
      setFileList((fileList) => [...fileList, ...newFileList]);
      newFileList.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setUrlList((urlList) => [...urlList, fileReader.result as string]);
        };
        fileReader.readAsDataURL(file);
      });
    }
  };

  return (
    <ImagesContainer>
      {urlList && (
        <ul>
          {urlList.map((url: string, idx: number) => (
            <li key={idx}>
              <img
                src={url}
                alt={fileList[idx].name}
                style={{ width: '100px' }}
              />
              <IconButton.Close style={{ position: 'absolute' }} />
            </li>
          ))}
        </ul>
      )}
      <ImageContainer htmlFor="image">
        <CameraIcon src={camera} alt="사진 업로드" />
      </ImageContainer>
      <Input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
    </ImagesContainer>
  );
};

export default ImageUploader;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
`;
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
    height: 120px;
    margin: 1rem 0;
    min-width: 100px;
  }
  @media ${Media.md} {
    height: 160px;
    min-width: 140px;
    margin: 2rem 0;
  }
  @media ${Media.lg} {
    height: 160px;
    min-width: 140px;
    margin: 2rem 0;
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
