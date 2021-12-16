import { Button, Modal } from '@/components';
import { MissionType } from '@/Models';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import TimeUtils from '@/utils/time';
import styled from '@emotion/styled';
import React, { Fragment } from 'react';

interface ExtendedMissionType extends MissionType {
  userDurationTime?: number;
  isPassed?: boolean;
}
export interface RoutineProgressModalProps extends React.ComponentProps<'div'> {
  missionObject: ExtendedMissionType[];
  visible: boolean;
  onClose: () => void;
}

const RoutineProgressModal = ({
  missionObject,
  visible,
  onClose,
  ...props
}: RoutineProgressModalProps): JSX.Element => {
  return (
    <Fragment>
      <StyledModal {...props} visible={visible} onClose={onClose}>
        {missionObject?.map(
          ({
            missionId,
            emoji,
            title,
            durationGoalTime,
            userDurationTime,
            isPassed,
          }) => (
            <RoutineProgressContainer key={missionId}>
              <Emoji>{emoji}</Emoji>
              <MissionInfo>
                <MissionName>{title}</MissionName>
                <DurationTimeContainer>
                  <DurationTime>
                    {userDurationTime === null
                      ? TimeUtils.calculateTime(durationGoalTime)
                      : TimeUtils.calculateTime(userDurationTime || 0)}
                  </DurationTime>
                  {userDurationTime ? (
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
                      {durationGoalTime < durationGoalTime - userDurationTime
                        ? '(+'
                        : durationGoalTime ===
                          durationGoalTime - userDurationTime
                        ? '('
                        : '(-'}
                      {TimeUtils.calculateTime(
                        durationGoalTime - userDurationTime,
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
      </StyledModal>
      {visible && <StyledButton onClick={onClose}>종료하기</StyledButton>}
    </Fragment>
  );
};

export default React.memo(RoutineProgressModal);

const StyledModal = styled(Modal)`
  padding: 2.5rem 0 5.5rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  max-width: 768px;
  width: 100%;
  height: 90vh;
  box-sizing: border-box;
  overflow: auto;
  background-color: ${Colors.backgroundModal};
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media ${Media.sm} {
    width: 95%;
    height: 80vh;
    padding: 2.5rem 0 3.5rem;
  }
`;

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

const StyledButton = styled(Button)`
  position: fixed;
  bottom: calc(5vh + 2.5rem);
  z-index: 1001;
  width: 25rem;
  right: 50%;
  transform: translateX(+50%);

  @media ${Media.sm} {
    width: 15rem;
    bottom: calc(8vh + 2.5rem);
  }
`;
