import { Colors, FontSize, FontWeight, Media } from '@/styles';
import TimeUtils from '@/utils/time';
import styled from '@emotion/styled';
import React from 'react';
import 'moment/locale/ko';
import { RoutineType } from '@/Models';

export interface RoutineInfoProps extends React.ComponentProps<'div'> {
  routineObject: Partial<RoutineType>;
  createdAt?: string;
}

const RoutineInfo = ({
  routineObject,
  createdAt: time,
  ...props
}: RoutineInfoProps): JSX.Element => {
  const { emoji, name, durationGoalTime } = routineObject;
  const durationTime = TimeUtils.calculateTime(durationGoalTime || 0);
  const createdAt = time && TimeUtils.dateFromNow(time);

  return (
    <RoutineInfoContainer {...props}>
      <Emoji>{emoji}</Emoji>
      <Title>{name}</Title>
      <Time>{durationTime}</Time>
      {createdAt && <CreateDate>{createdAt}</CreateDate>}
    </RoutineInfoContainer>
  );
};

export default RoutineInfo;

const RoutineInfoContainer = styled.div`
  text-align: center;
  padding: 0.5rem;
  box-sizing: border-box;
`;

const Emoji = styled.p`
  font-size: 3rem;
  height: 3rem;
  margin-bottom: 1.5rem;

  @media ${Media.sm} {
    font-size: 2rem;
    margin-bottom: 0;
  }
`;

const Title = styled.h1`
  font-size: ${FontSize.large};
  font-weight: ${FontWeight.bold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.5rem;

  @media ${Media.sm} {
    font-size: ${FontSize.medium};
    margin-bottom: 0.25rem;
  }
`;

const Time = styled.p`
  font-size: ${FontSize.medium};
  font-weight: ${FontWeight.bold};
  color: ${Colors.textTertiary};

  @media ${Media.sm} {
    font-size: ${FontSize.micro};
  }
`;

const CreateDate = styled(Time)`
  font-size: ${FontSize.small};
  font-weight: ${FontWeight.regular};
  margin-top: 0.5rem;

  @media ${Media.sm} {
    font-size: 0.675rem;
    margin-top: 0.25rem;
  }
`;
