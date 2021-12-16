import { DeleteBox, EditBox, Icon } from '@/components';
import { WEEK } from '@/constants';
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
  deleteRoutine?: () => void;
  updateRoutine?: () => void;
}

const Routine = ({
  routineObject,
  completed,
  like,
  type,
  style,
  deleteRoutine,
  updateRoutine,
  ...props
}: RoutineProps): JSX.Element => {
  const { emoji, color, name, durationGoalTime, startGoalTime, weeks } =
    routineObject;
  const durationTime = TimeUtils.calculateTime(durationGoalTime || 0);
  const startTime = TimeUtils.startTime(
    startGoalTime || new Date().toISOString(),
  );
  const [visible, setVisible] = useState<boolean>(false);

  const handleCloseToolBox = () => {
    setVisible(false);
  };

  const handleClickDeleteButton = () => {
    deleteRoutine && deleteRoutine();
  };

  const handleClickUpdateButton = () => {
    updateRoutine && updateRoutine();
  };

  const convertWeeks = (weeks: string[] | undefined) => {
    const convertedWeeks = weeks?.map((week) => WEEK[week]);
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

  const onClickToolBox = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <RoutineContainer
      style={{
        backgroundColor: color,
        filter: `opacity(${completed ? '0.7' : '1'})`,
        ...style,
      }}
      {...props}
    >
      <RoutineHeader>
        {type === 'myRoutine' ? (
          <CheckComplete completed={!!completed} />
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
                onClick={onClickToolBox}
                onClose={handleCloseToolBox}
                onClickUpdateButton={handleClickUpdateButton}
                onClickDeleteButton={handleClickDeleteButton}
              />
            ) : type === 'communityMyRoutine' ? (
              <DeleteBox
                style={{ transform: 'translate(-110px, -24px)', width: 110 }}
                visible={visible}
                onClick={onClickToolBox}
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
      <Emoji>{emoji ? emoji : '\u00A0'}</Emoji>
      <Title>{name ? name : '\u00A0'}</Title>
      <TotalTime>{durationTime ? durationTime : '\u00A0'}</TotalTime>
      <Weeks>
        {type === 'myRoutine' ? `${convertWeeks(weeks)}` : '\u00A0'}
      </Weeks>
      <StartTime>{startTime ? startTime : '\u00A0'}</StartTime>
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
  padding: 1rem;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;

  @media ${Media.sm} {
    padding: 0.875rem;
  }
`;

const Like = styled.span`
  vertical-align: top;
  margin-left: 0.25rem;

  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
`;

const Emoji = styled.div`
  font-size: 3em;
  height: 3rem;
  margin: 1rem 0 1.5rem;

  @media ${Media.sm} {
    font-size: 2em;
    margin: 0.5rem 0 0rem;
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
  margin: 0.75rem 0 0.75rem;

  @media ${Media.sm} {
    font-size: 0.625rem;
    margin: 0.25rem 0;
  }
`;

const Weeks = styled.p`
  font-size: ${FontSize.small};
  font-weight: ${FontWeight.bold};
  margin-bottom: 0.75rem;

  @media ${Media.sm} {
    font-size: 0.625rem;
    margin-bottom: 0.25rem;
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
