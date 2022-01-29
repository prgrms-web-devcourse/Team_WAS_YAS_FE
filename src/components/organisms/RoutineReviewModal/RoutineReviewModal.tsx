import { Button, Modal, Text } from '@/components';
import { Colors, FontSize, Media } from '@/styles';
import styled from '@emotion/styled';
import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import ImageUploader from './ImageUploader';
import { RoutineReviewType } from '@/Models';
import { EMOTION } from '@/constants';
import { v4 } from 'uuid';

export interface ReviewProps {
  visible: boolean;
  onClose?: () => void;
  onSubmit: (review: RoutineReviewType) => void;
  initReview: RoutineReviewType;
}

const RoutineReviewModal = ({
  visible,
  onClose,
  initReview,
  onSubmit,
}: ReviewProps): JSX.Element => {
  const [review, setReview] = useState<RoutineReviewType>(initReview);
  const emotionList = Object.keys(EMOTION);

  const handleEmotionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReview((review) => ({ ...review, emotion: Number(e.target.value) }));
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview((review) => ({ ...review, content: e.target.value }));
  };

  const handleImageChange = (fileList: File[]) => {
    if (fileList) {
      fileList.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          const id = v4();
          const newUrl = {
            routineStatusImageId: id,
            imageUrl: fileReader.result as string,
          };
          const newFile = {
            routineStatusImageId: id,
            file,
          };
          setReview((review) => ({
            ...review,
            routineStatusImage: [...review.routineStatusImage, newUrl],
            reviewImages: [...review.reviewImages, newFile],
          }));
        };
      });
    }
  };

  const handleImageDelete = (routineStatusImageId: string | number) => {
    if (typeof routineStatusImageId === 'number') {
      setReview((review) => ({
        ...review,
        deletedImages: [...review.deletedImages, routineStatusImageId],
      }));
    }
    const newUrlList = review.routineStatusImage.filter(
      (image) => image.routineStatusImageId !== routineStatusImageId,
    );
    const newFileList = review.reviewImages.filter(
      (image) => image.routineStatusImageId !== routineStatusImageId,
    );
    setReview((review) => ({
      ...review,
      reviewImages: newFileList,
      routineStatusImage: newUrlList,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && onSubmit(review);
  };

  return (
    <StyledModal visible={visible} onClose={onClose}>
      <Title>오늘의 루틴은 어떠셨나요?</Title>
      <Form onSubmit={handleSubmit}>
        <EmotionContainer>
          {emotionList.map((emotion: string) => (
            <Fragment key={emotion}>
              <Input
                type="radio"
                id={emotion}
                name="emotion"
                value={emotion}
                onChange={handleEmotionChange}
                checked={review.emotion === Number(emotion)}
              />
              <label htmlFor={emotion}>
                <Image src={EMOTION[emotion]} alt="emotionImg" />
              </label>
            </Fragment>
          ))}
        </EmotionContainer>
        <ImageUploader
          routineImages={review.routineStatusImage}
          onImageChange={handleImageChange}
          onImageDelete={handleImageDelete}
        />
        <TextArea
          name="text"
          placeholder="루틴 후기를 입력해주세요."
          value={review.content}
          onChange={handleContentChange}
        />
        {review.content ? (
          <Span>&nbsp;</Span>
        ) : (
          <Span>루틴 후기를 입력해주세요</Span>
        )}
        <ButtonContainer>
          <Button type="button" colorType="white">
            취소하기
          </Button>
          <Button type="submit">등록하기</Button>
        </ButtonContainer>
      </Form>
    </StyledModal>
  );
};

export default RoutineReviewModal;

const StyledModal = styled(Modal)`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${Media.sm} {
    max-height: 600px;
  }
  @media ${Media.md} {
    max-height: 910px;
  }
  @media ${Media.lg} {
    max-height: 910px;
  }
`;

const Title = styled(Text)`
  color: ${Colors.textPrimary};
  margin-top: 3rem;
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

const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  @media ${Media.sm} {
    margin-top: 1rem;
    > button {
      height: 40px;
      margin: 0.5rem 0;
    }
  }
  @media ${Media.md} {
    display: flex;
    margin-top: 2rem;
    > button {
      margin: 0 1rem;
    }
  }
  @media ${Media.lg} {
    display: flex;
    margin-top: 2rem;
    > button {
      margin: 0 1rem;
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  outline-color: ${Colors.pointLight};
  background-color: ${Colors.backgroundButton};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 1rem;
  resize: none;
  margin-top: 1.5rem;
  @media ${Media.sm} {
    min-height: 100px;
    font-size: ${FontSize.small};
  }
  @media ${Media.md} {
    min-height: 140px;
    font-size: ${FontSize.medium};
  }
  @media ${Media.lg} {
    min-height: 140px;
    font-size: ${FontSize.medium};
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

const Input = styled.input`
  display: none;
  :checked + label > img {
    opacity: 0.4;
  }
`;

const Image = styled.img`
  @media ${Media.sm} {
    width: 28px;
    height: 28px;
    margin: 0.6rem;
  }
  @media ${Media.md} {
    width: 48px;
    height: 48px;
    margin: 0.8rem;
  }
  @media ${Media.lg} {
    width: 48px;
    height: 48px;
    margin: 0.8rem;
  }
  cursor: pointer;
`;

const EmotionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
