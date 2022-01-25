import { Button, Modal, Text } from '@/components';
import EmotionPicker from './EmotionPicker';
import { Colors, FontSize, Media } from '@/styles';
import styled from '@emotion/styled';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Swal from 'sweetalert2';
import ImageUploader from './ImageUploader';

export interface ReviewProps {
  visible: boolean;
  onClose?: () => void;
  onSubmit: (review: {
    emotion: string;
    text: string;
    urlList: { id: string; url: string }[];
  }) => void;
}

const RoutineReviewModal = ({
  visible,
  onClose,
  onSubmit,
}: ReviewProps): JSX.Element => {
  const [review, setReview] = useState<{
    emotion: string;
    text: string;
    urlList: { id: string; url: string }[];
  }>({
    emotion: '1',
    text: '',
    urlList: [],
  });

  const handleEmotionChange = (emotion: string) => {
    setReview((review) => ({ ...review, emotion }));
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview((review) => ({ ...review, text: e.target.value }));
  };

  const handleImageChange = (newUrl: { id: string; url: string }) => {
    setReview((review) => ({
      ...review,
      urlList: [...review.urlList, newUrl],
    }));
  };

  const handleImageDelete = (id: string) => {
    const newUrlList = review.urlList.filter((url) => url.id !== id);
    setReview((review) => ({ ...review, urlList: [...newUrlList] }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!review.text) {
      Swal.fire({
        icon: 'error',
        text: '루틴 후기를 작성해주세요',
        showConfirmButton: false,
        timer: 1000,
      });
    } else if (review.urlList.length > 5) {
      Swal.fire({
        icon: 'error',
        text: '사진은 최대 5장까지 업로드가 가능합니다',
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        icon: 'success',
        text: '루틴 후기 등록에 성공했습니다!🎉',
      });
    }
  };

  return (
    <StyledModal visible={visible} onClose={onClose}>
      <Title>오늘의 루틴은 어떠셨나요?</Title>
      <Form onSubmit={handleSubmit}>
        <EmotionPicker onChange={handleEmotionChange} />
        <ImageUploader
          onChange={handleImageChange}
          onImageDelete={handleImageDelete}
        />
        <TextArea
          name="text"
          placeholder="루틴 후기를 입력해주세요."
          value={review.text}
          onChange={handleTextChange}
        />
        {review.text ? (
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
