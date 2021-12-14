import { Colors, FontSize, FontWeight, Media } from '@/styles';
import TimeUtils from '@/utils/time';
import styled from '@emotion/styled';
import React, { Fragment } from 'react';

export interface RoutineProgressProps extends React.ComponentProps<'div'> {
  missionObject: {
    id: string;
    emoji: string;
    color: string;
    name: string;
    durationTime: number;
    userDurationTime?: number;
  }[];
}

const RoutineProgress = ({
  missionObject,
  ...props
}: RoutineProgressProps): JSX.Element => {
  return (
    <Fragment>
      {missionObject?.map(
        ({ id, emoji, name, durationTime, userDurationTime }) => (
          <RoutineProgressContainer key={id}>
            <Emoji>{emoji}</Emoji>
            <MissionInfo>
              <MissionName>{name}</MissionName>
              <DurationTimeContainer>
                <DurationTime>
                  {TimeUtils.calculateTime(durationTime)}
                </DurationTime>
                {userDurationTime && (
                  <UserDurationTime
                    style={{
                      color:
                        durationTime < userDurationTime
                          ? `${Colors.functionNegative}`
                          : durationTime === userDurationTime
                          ? `${Colors.textSecondary}`
                          : `${Colors.functionPositive}`,
                    }}
                  >
                    {durationTime < userDurationTime
                      ? '(+'
                      : durationTime === userDurationTime
                      ? '('
                      : '(-'}
                    {TimeUtils.calculateTime(userDurationTime) + ')'}
                  </UserDurationTime>
                )}
              </DurationTimeContainer>
            </MissionInfo>
          </RoutineProgressContainer>
        ),
      )}
    </Fragment>
  );
};

export default RoutineProgress;

const RoutineProgressContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Emoji = styled.span`
  font-size: 3rem;
  margin-right: 2rem;

  @media ${Media.sm} {
    font-size: 2.5rem;
    margin-right: 1rem;
  }
`;

const MissionName = styled.h1`
  font-size: ${FontSize.medium};
  font-weight: ${FontWeight.medium};
  color: ${Colors.textPrimary};

  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
`;

const DurationTimeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 160px);

  @media ${Media.sm} {
    grid-template-columns: repeat(2, 100px);
  }
`;

const DurationTime = styled.p`
  font-size: ${FontSize.medium};
  color: ${Colors.textSecondary};

  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
`;

const UserDurationTime = styled.p`
  font-size: ${FontSize.medium};
  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
`;

const MissionInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
`;
