import { Colors, FontSize, FontWeight, Media } from '@/styles';
import TimeUtils from '@/utils/time';
import styled from '@emotion/styled';
import React, { Fragment } from 'react';

export interface RoutineProgressProps extends React.ComponentProps<'div'> {
  missionObject: {
    missionId: number;
    emoji: string;
    color: string;
    name: string;
    durationGoalTime: number;
    userDurationTime?: number;
    isPassed?: boolean;
  }[];
}

const RoutineProgressModal = ({
  missionObject,
}: Partial<RoutineProgressProps>): JSX.Element => {
  return (
    <Fragment>
      {missionObject?.map(
        ({
          missionId,
          emoji,
          name,
          durationGoalTime,
          userDurationTime,
          isPassed,
        }) => (
          <RoutineProgressContainer key={missionId}>
            <Emoji>{emoji}</Emoji>
            <MissionInfo>
              <MissionName>{name}</MissionName>
              <DurationTimeContainer>
                <DurationTime>
                  {userDurationTime === null
                    ? TimeUtils.calculateTime(durationGoalTime)
                    : TimeUtils.calculateTime(userDurationTime || 0)}
                </DurationTime>
                {userDurationTime || userDurationTime === 0 ? (
                  <UserDurationTime
                    style={{
                      color:
                        durationGoalTime < userDurationTime
                          ? `${Colors.functionNegative}`
                          : durationGoalTime === userDurationTime
                          ? `${Colors.textSecondary}`
                          : `${Colors.functionPositive}`,
                    }}
                  >
                    {userDurationTime === 0
                      ? '(-'
                      : durationGoalTime < durationGoalTime - userDurationTime
                      ? '(+'
                      : durationGoalTime === userDurationTime
                      ? '('
                      : '(-'}
                    {TimeUtils.calculateTime(
                      Math.abs(durationGoalTime - userDurationTime),
                    ) + ')'}
                  </UserDurationTime>
                ) : isPassed ? (
                  <UserDurationTime
                    style={{ color: Colors.orange, fontStyle: 'italic' }}
                  >
                    Pass
                  </UserDurationTime>
                ) : null}
              </DurationTimeContainer>
            </MissionInfo>
          </RoutineProgressContainer>
        ),
      )}
    </Fragment>
  );
};

export default React.memo(RoutineProgressModal);

const RoutineProgressContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 6.25rem 20rem;
  margin-bottom: 2rem;

  @media ${Media.sm} {
    grid-template-columns: 5rem 12.5rem;
  }
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
