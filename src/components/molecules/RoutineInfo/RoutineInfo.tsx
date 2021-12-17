import { Colors, FontSize, FontWeight, Media } from '@/styles';
import TimeUtils from '@/utils/time';
import styled from '@emotion/styled';
import React from 'react';
import 'moment/locale/ko';
import { WEEK } from '@/constants';

export interface RoutineInfoProps extends React.ComponentProps<'div'> {
  routineObject: {
    emoji?: string;
    name?: string;
    durationGoalTime?: number;
    weeks?: string[];
  };
  createdAt?: string;
}

const RoutineInfo = ({
  routineObject,
  createdAt: time,
  ...props
}: RoutineInfoProps): JSX.Element => {
  const { emoji, name, durationGoalTime, weeks } = routineObject;
  const durationTime = TimeUtils.calculateTime(durationGoalTime || 0);
  const createdAt = time && TimeUtils.dateFromNow(time);
  const convertWeeks = (weeks: string[] | undefined) => {
    const convertedWeeks = weeks
      ?.map((week) => Object.keys(WEEK).indexOf(week))
      .sort((a, b) => a - b)
      .map((week) => Object.values(WEEK)[week]);
    const weekString = convertedWeeks?.join('');

    switch (weekString) {
      case '월화수목금':
        return '평일';
      case '토일':
        return '주말';
      case '월화수목금토일':
        return '매일';
      default:
        return convertedWeeks?.join(' ');
    }
  };

  return (
    <RoutineInfoContainer {...props}>
      <Emoji>{emoji}</Emoji>
      <Title>{name}</Title>
      <Time>{durationTime}</Time>
      {convertWeeks(weeks) && <Weeks>{convertWeeks(weeks)}</Weeks>}
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

const Weeks = styled.div`
  font-size: ${FontSize.small};
  font-weight: ${FontWeight.bold};
  color: ${Colors.textTertiary};
  margin-top: 0.25rem;

  @media ${Media.sm} {
    font-size: ${FontSize.micro};
    margin-top: 0.125rem;
  }
`;
