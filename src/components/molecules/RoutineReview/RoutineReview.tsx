import { Button, SpreadToggle } from '@/components';
import { EMOTION, EMOTIONTEXT } from '@/constants';
import { good } from '@/images';
import { Colors, FontSize, FontWeight } from '@/styles';
import styled from '@emotion/styled';
import { Fragment, HTMLAttributes, useEffect, useRef, useState } from 'react';
import ToolBoxButtonIcon from '../Routine/ToolBoxButtonIcon';
import { EditBox } from '../ToolBox';

type ReviewDataType = {
  routineStatusId: number;
  dateTime: string;
  emoji: string;
  content: string;
  routineStatusImage: {
    routineStatusImageId: number;
    imageUrl: string;
  }[];
  routineDetailResponse: {
    name: string;
    emoji: string;
    color: string;
    startGoalTime: string;
    durationGoalTime: number;
    routineCategory: string[];
    weeks: string[];
    missionDetailResponses: {
      missionId: number;
      name: string;
      durationGoalTime: number;
      orders: number;
      emoji: string;
      color: string;
    }[];
    posted: boolean;
  };
};

export type RoutineReviewProps = {
  reviewData: ReviewDataType;
  onClickWriteReview: () => void;
  updateRoutine: () => void;
  deleteRoutine: () => void;
} & HTMLAttributes<HTMLDivElement>;

const RoutineReview = ({
  reviewData,
  onClickWriteReview,
  updateRoutine,
  deleteRoutine,
  ...props
}: RoutineReviewProps): JSX.Element => {
  const [opened, setOpened] = useState<boolean>(false);
  const [paragraphHeight, setParagraphHeight] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const { emoji, content, routineStatusImage, routineDetailResponse } =
    reviewData;
  const { posted } = routineDetailResponse;

  const handleClickSpreadToggle = () => {
    setOpened((opened) => !opened);
  };

  useEffect(() => {
    if (ref.current) {
      setParagraphHeight(ref.current.scrollHeight);
    }
  }, []);

  const handleCloseToolBox = () => {
    setVisible(false);
  };

  const handleClickDeleteButton = () => {
    deleteRoutine && deleteRoutine();
  };

  const handleClickUpdateButton = () => {
    updateRoutine && updateRoutine();
  };

  const onClickToolBox = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <RoutineReviewContainer posted={posted} {...props}>
      {posted ? (
        <Fragment>
          <ReviewEmotionContainer>
            <ReviewEmotion src={EMOTION[emoji]} alt={EMOTIONTEXT[emoji]} />
            <ReviewEmotionText>{EMOTIONTEXT[emoji]}</ReviewEmotionText>
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
            <ReviewContent ref={ref} opened={opened} height={paragraphHeight}>
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

const RoutineReviewContainer = styled.div<{ posted: boolean }>`
  background-color: ${Colors.backgroundModal};
  border-radius: 1rem;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  ${({ posted }) =>
    posted
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
  font-size: ${FontSize.medium};
  color: ${Colors.textTertiary};
`;

const ReviewEmotion = styled.img`
  width: 73px;
  height: 73px;
`;

const StyledButton = styled(Button)`
  width: 16.875rem;
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
  flex-direction: column;
  margin-left: 1.5rem;
  flex-grow: 1;
  overflow-x: auto;
`;

const ReviewImageContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  gap: 1.125rem;
  height: 12.5rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  img {
    height: 12.5rem;
    border-radius: 1rem;
  }
`;

const ReviewContent = styled.p<{ opened: boolean; height: number }>`
  font-size: ${FontSize.medium};
  color: ${Colors.textPrimary};
  font-weight: ${FontWeight.medium};
  white-space: break-spaces;
  line-height: 1.625rem;
  overflow: hidden;
  height: ${({ opened, height }) => (opened ? `${height}` : '2rem')};
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
