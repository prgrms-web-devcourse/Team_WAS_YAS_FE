import { Button, SpreadToggle } from '@/components';
import { EMOTION, EMOTIONTEXT } from '@/constants';
import { good } from '@/images';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import styled from '@emotion/styled';
import { Fragment, HTMLAttributes, useEffect, useRef, useState } from 'react';
import ToolBoxButtonIcon from '../Routine/ToolBoxButtonIcon';
import { EditBox } from '../ToolBox';

type ReviewDataType = {
  routineStatusId: number;
  emotion: number;
  content: string;
  routineStatusImage: {
    routineStatusImageId: number | string;
    imageUrl: string;
  }[];
};

export type RoutineReviewProps = {
  reviewData: ReviewDataType;
  onClickWriteReview: () => void;
  updateReview: () => void;
  deleteReview: () => void;
} & HTMLAttributes<HTMLDivElement>;

const RoutineReview = ({
  reviewData,
  onClickWriteReview,
  updateReview,
  deleteReview,
  ...props
}: RoutineReviewProps): JSX.Element => {
  const [opened, setOpened] = useState<boolean>(false);
  const [paragraphHeight, setParagraphHeight] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const { emotion, content, routineStatusImage } = reviewData;

  const handleClickSpreadToggle = () => {
    setOpened((opened) => !opened);
  };
  useEffect(() => {
    if (ref.current) {
      setParagraphHeight(ref.current.scrollHeight);
    }
  }, [reviewData.content]);

  const handleCloseToolBox = () => {
    setVisible(false);
  };

  const handleClickDeleteButton = () => {
    deleteReview && deleteReview();
  };

  const handleClickUpdateButton = () => {
    updateReview && updateReview();
  };

  const onClickToolBox = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <RoutineReviewContainer reviewData={reviewData} {...props}>
      {reviewData.content ? (
        !routineStatusImage.length ? (
          <Fragment>
            <ReviewEmotionContainer>
              <ReviewEmotion
                src={EMOTION[emotion]}
                alt={EMOTIONTEXT[emotion]}
              />
              <ReviewEmotionText>{EMOTIONTEXT[emotion]}</ReviewEmotionText>
            </ReviewEmotionContainer>
            <ReviewContentContainer>
              <ReviewContent
                ref={ref}
                opened={opened}
                height={paragraphHeight}
                withPhoto={false}
              >
                {content}
              </ReviewContent>
              {paragraphHeight < 70 ? null : (
                <StyledSpreadToggle onClick={handleClickSpreadToggle} />
              )}
            </ReviewContentContainer>
            <ToolBoxContainer onClick={() => setVisible(true)}>
              <ToolBoxButtonIcon />
              <EditBox
                style={{ transform: 'translate(-110px, -48px)', width: 110 }}
                visible={visible}
                onClick={onClickToolBox}
                onClose={handleCloseToolBox}
                onClickUpdateButton={handleClickUpdateButton}
                onClickDeleteButton={handleClickDeleteButton}
              />
            </ToolBoxContainer>
          </Fragment>
        ) : (
          <Fragment>
            <ReviewEmotionContainer>
              <ReviewEmotion
                src={EMOTION[emotion]}
                alt={EMOTIONTEXT[emotion]}
              />
              <ReviewEmotionText>{EMOTIONTEXT[emotion]}</ReviewEmotionText>
            </ReviewEmotionContainer>
            <ReviewContentContainer>
              <ReviewImageContainer>
                {routineStatusImage.map(({ imageUrl }, i) => (
                  <img
                    key={`reviewImage-${i}`}
                    src={imageUrl}
                    alt="리뷰 이미지"
                  />
                ))}
              </ReviewImageContainer>
              <ReviewContent
                ref={ref}
                opened={opened}
                height={paragraphHeight}
                withPhoto={true}
              >
                {content}
              </ReviewContent>
              {paragraphHeight < 40 ? null : (
                <StyledSpreadToggle onClick={handleClickSpreadToggle} />
              )}
            </ReviewContentContainer>
            <ToolBoxContainer onClick={() => setVisible(true)}>
              <ToolBoxButtonIcon />
              <EditBox
                style={{ transform: 'translate(-110px, -48px)', width: 110 }}
                visible={visible}
                onClick={onClickToolBox}
                onClose={handleCloseToolBox}
                onClickUpdateButton={handleClickUpdateButton}
                onClickDeleteButton={handleClickDeleteButton}
              />
            </ToolBoxContainer>
          </Fragment>
        )
      ) : (
        <Fragment>
          <ReviewText>후기가 없습니다. 지금 후기를 작성해볼까요?</ReviewText>
          <ReviewEmotion src={good} alt="good" />
          <StyledButton onClick={onClickWriteReview}>
            후기 작성하기
          </StyledButton>
        </Fragment>
      )}
    </RoutineReviewContainer>
  );
};

export default RoutineReview;

const RoutineReviewContainer = styled.div<{ reviewData: ReviewDataType }>`
  background-color: ${Colors.backgroundModal};
  border-radius: 1rem;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  justify-content: initial;
  align-items: initial;
  ${({ reviewData }) =>
    reviewData.content
      ? `
    flex-direction: row;
    justify-content: initial;
    align-items: initial;
    `
      : `
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
  `}
  padding: 1.75rem;
  height: 100%;
  position: relative;
`;

const ReviewText = styled.p`
  color: ${Colors.textTertiary};
  font-size: ${FontSize.medium};
  word-break: keep-all;
`;

const ReviewEmotion = styled.img`
  @media ${Media.sm} {
    width: 40px;
    height: 40px;
  }
  @media ${Media.md} {
    width: 48px;
    height: 48px;
  }
  @media ${Media.lg} {
    width: 48px;
    height: 48px;
  }
`;

const StyledButton = styled(Button)`
  width: 60%;
`;

const ReviewEmotionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  gap: 1.125rem;
  padding-right: 1.5rem;
  border-right: 1px solid ${Colors.backgroundMenu};
`;

const ReviewEmotionText = styled.span`
  font-size: ${FontSize.micro};
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  background-color: ${Colors.backgroundMenu};
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
`;

const ReviewContentContainer = styled.div`
  display: inline-flex;
  margin-left: 1.5rem;
  flex-grow: 1;
  overflow-x: auto;
  flex-direction: column;
  justify-content: center;
`;

const ReviewImageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  gap: 1.125rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  img {
    border-radius: 1rem;
    @media ${Media.sm} {
      height: 80px;
    }
    @media ${Media.md} {
      height: 120px;
    }
    @media ${Media.lg} {
      height: 120px;
    }
  }
`;

const ReviewContent = styled.p<{
  opened: boolean;
  height: number;
  withPhoto: boolean;
}>`
  color: ${Colors.textPrimary};
  font-weight: ${FontWeight.medium};
  white-space: break-spaces;
  word-break: keep-all;
  line-height: 1.625rem;
  overflow: hidden;
  height: ${({ opened, height, withPhoto }) =>
    opened ? `${height}` : withPhoto ? '2rem' : '3.2rem'};
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

const StyledSpreadToggle = styled(SpreadToggle)`
  display: flex;
  justify-content: center;
`;

const ToolBoxContainer = styled.div`
  background-color: initial;
  border: none;
  padding: 1rem;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;

  path {
    fill: ${Colors.textTertiary};
  }
`;
