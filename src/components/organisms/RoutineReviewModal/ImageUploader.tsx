import { camera } from '@/images';
import { Colors, FontSize, Media } from '@/styles';
import styled from '@emotion/styled';
import React, { ChangeEvent, useState } from 'react';
import { v4 } from 'uuid';

export interface ImageProps {
  onChange: (newUrl: { id: string; url: string }) => void;
  onImageDelete: (id: string) => void;
}

const ImageUploader = ({
  onChange,
  onImageDelete,
}: ImageProps): JSX.Element => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [urlList, setUrlList] = useState<{ id: string; url: string }[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFileList = [...e.target.files];
      setFileList((fileList) => [...fileList, ...newFileList]);
      newFileList.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          const newUrl = { id: v4(), url: fileReader.result as string };
          onChange && onChange(newUrl);
          setUrlList((urlList) => [...urlList, newUrl]);
        };
      });
    }
  };

  const handleImageDelete = (id: string) => {
    const newUrlList = urlList.filter((url) => url.id !== id);
    setUrlList(newUrlList);
    onImageDelete && onImageDelete(id);
  };

  return (
    <>
      {urlList && (
        <Ul
          style={{
            justifyContent: `${urlList.length ? 'flex-start' : 'center'}`,
          }}
        >
          {urlList.map(({ id, url }, idx) => (
            <Li key={id}>
              <Image src={url} alt={fileList[idx].name} />
              <DeleteButton onClick={() => handleImageDelete(id)}>
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
    max-width: 80px;
  }
  @media ${Media.md} {
    height: 140px;
    max-width: 140px;
    margin: 0.5rem 0;
  }
  @media ${Media.lg} {
    height: 140px;
    min-width: 140px;
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

const Span = styled.span`
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem;
  color: ${Colors.functionNegative};
  text-align: left;
  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
  @media ${Media.md} {
    font-size: ${FontSize.medium};
  }
  @media ${Media.lg} {
    font-size: ${FontSize.medium};
  }
`;
