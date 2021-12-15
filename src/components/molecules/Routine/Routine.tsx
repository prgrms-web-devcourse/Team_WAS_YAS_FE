import { DeleteBox, EditBox, Icon } from '@/components';
import { RoutineType } from '@/Models';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import TimeUtils from '@/utils/time';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import CheckComplete from './CheckComplete';
import ToolBoxButtonIcon from './ToolBoxButtonIcon';

interface RoutineProps extends React.ComponentProps<'div'> {
  routineObject: Partial<RoutineType>;
  type: 'myRoutine' | 'communityMyRoutine' | 'communityRoutine' | 'create';
  completed?: boolean;
  like?: number;
}

const Routine = ({
  routineObject,
  completed,
  like,
  type,
  style,
  ...props
}: RoutineProps): JSX.Element => {
  const { emoji, color, title, durationGoalTime, startGoalTime } =
    routineObject;
  const durationTime = TimeUtils.calculateTime(durationGoalTime || 500);
  const startTime = TimeUtils.formatStartTime(
    startGoalTime || new Date().toISOString(),
  );
  const [visible, setVisible] = useState<boolean>(false);

  const handleCloseToolBox = () => {
    setVisible(false);
  };

  const handleClickDeleteButton = () => {
    console.log('clicked delete button');
  };

  const handleClickUpdateButton = () => {
    console.log('clicked update button');
  };

  return (
    <RoutineContainer
      style={{
        backgroundColor: color,
        opacity: `${completed ? '0.7' : '1'}`,
        ...style,
      }}
      {...props}
    >
      <RoutineHeader>
        {type === 'myRoutine' ? (
          <CheckComplete completed={completed ? completed : false} />
        ) : (
          <div />
        )}

        {type === 'myRoutine' || type === 'communityMyRoutine' ? (
          <ToolBoxContainer
            className="ToolBox"
            onClick={() => setVisible(true)}
          >
            <ToolBoxButtonIcon />
            {type === 'myRoutine' ? (
              <EditBox
                style={{ transform: 'translate(-110px, -48px)', width: 110 }}
                visible={visible}
                onClose={handleCloseToolBox}
                onClickUpdateButton={handleClickUpdateButton}
                onClickDeleteButton={handleClickDeleteButton}
              />
            ) : type === 'communityMyRoutine' ? (
              <DeleteBox
                style={{ transform: 'translate(-110px, -24px)', width: 110 }}
                visible={visible}
                onClose={handleCloseToolBox}
                onClickDeleteButton={handleClickDeleteButton}
              />
            ) : null}
          </ToolBoxContainer>
        ) : type === 'communityRoutine' ? (
          <div>
            <Icon.Like color="#FFF" />
            <Like>{like ? like : 0}</Like>
          </div>
        ) : null}
      </RoutineHeader>
      <Emoji>{emoji}&nbsp;</Emoji>
      <Title>{title}&nbsp;</Title>
      <TotalTime>{durationTime}&nbsp;</TotalTime>
      <StartTime>{startTime}&nbsp;</StartTime>
    </RoutineContainer>
  );
};

const RoutineContainer = styled.div`
  display: inline-block;
  width: 15rem;
  height: 15rem;
  border-radius: 2rem;
  padding: 1rem;
  box-sizing: border-box;
  color: ${Colors.textQuaternary};
  text-align: center;
  cursor: pointer;
  position: relative;

  @media ${Media.sm} {
    width: 8.75rem;
    height: 8.75rem;
    padding: 0.875rem;
  }
`;

const RoutineHeader = styled.header`
  display: flex;
  justify-content: space-between;
  height: 1.25rem;

  @media ${Media.sm} {
    height: 0.5rem;
  }
`;

const ToolBoxContainer = styled.div`
  background-color: inherit;
  border: none;
  padding: 0 0 1.5rem 1rem;
  cursor: pointer;
`;

const Like = styled.span`
  vertical-align: top;
  margin-left: 0.25rem;

  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
`;

const Emoji = styled.div`
  font-size: 3rem;
  height: 3rem;
  margin: 1rem 0 1.5rem;

  @media ${Media.sm} {
    font-size: 2rem;
    margin: 0.5rem 0 0.25rem;
  }
`;

const Title = styled.h1`
  font-size: ${FontSize.large};
  font-weight: ${FontWeight.bold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media ${Media.sm} {
    font-size: ${FontSize.micro};
  }
`;

const TotalTime = styled.h2`
  font-size: ${FontSize.medium};
  font-weight: ${FontWeight.bold};
  margin: 0.75rem 0 1.75rem;

  @media ${Media.sm} {
    font-size: 0.625rem;
    margin: 0.5rem 0;
  }
`;

const StartTime = styled.h3`
  font-size: ${FontSize.micro};
  font-weight: ${FontWeight.bold};

  @media ${Media.sm} {
    font-size: 0.625rem;
  }
`;

export type { RoutineProps };
export default Routine;
