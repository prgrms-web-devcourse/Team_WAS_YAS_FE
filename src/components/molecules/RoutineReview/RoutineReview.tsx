import { Button } from '@/components';
import { good } from '@/images';
import { Colors, FontSize } from '@/styles';
import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';

const RoutineReview = ({
  ...props
}: HTMLAttributes<HTMLDivElement>): JSX.Element => {
  return (
    <RoutineReviewContainer {...props}>
      <ReviewText>후기가 없습니다. 지금 후기를 작성해볼까요?</ReviewText>
      <ReviewEmoji src={good} alt="good" />
      <StyledButton>후기 작성하기</StyledButton>
    </RoutineReviewContainer>
  );
};

export default RoutineReview;

const RoutineReviewContainer = styled.div`
  height: 20rem;
  background-color: ${Colors.backgroundModal};
  border-radius: 1rem;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const ReviewText = styled.p`
  font-size: ${FontSize.medium};
  color: ${Colors.textTertiary};
`;

const ReviewEmoji = styled.img`
  width: 73px;
  height: 73px;
`;

const StyledButton = styled(Button)`
  width: 16.875rem;
`;
