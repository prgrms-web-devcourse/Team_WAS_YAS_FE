import { Button, Modal } from '@/components';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import TimeUtils from '@/utils/time';
import styled from '@emotion/styled';
import React, { Fragment } from 'react';

export interface RoutineProgressModalProps extends React.ComponentProps<'div'> {
  missionObject: {
    id: string;
    emoji: string;
    color: string;
    name: string;
    durationTime: number;
    userDurationTime?: number;
  }[];
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
                            ? '#FF4545'
                            : durationTime === userDurationTime
                            ? `${Colors.textSecondary}`
                            : '#5465FF',
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
      </StyledModal>
      {visible && <StyledButton onClick={onClose}>종료하기</StyledButton>}
    </Fragment>
  );
};

export default RoutineProgressModal;

const StyledModal = styled(Modal)`
  padding: 40px 0 60px;
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
    padding: 40px 0;
  }
`;

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
  gap: 8px;
`;

const StyledButton = styled(Button)`
  position: fixed;
  bottom: 40px;
  z-index: 1001;
  width: 400px;
  right: 50%;
  transform: translateX(+50%);

  @media ${Media.sm} {
    width: 240px;
    bottom: 60px;
  }
`;
