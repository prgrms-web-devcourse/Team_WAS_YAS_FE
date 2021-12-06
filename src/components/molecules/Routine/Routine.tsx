import { DeleteBox, EditBox, Icon } from '@/components';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import CheckComplete from './CheckComplete';
import ToolBoxButtonIcon from './ToolBoxButtonIcon';

interface RoutineProps extends React.ComponentProps<'div'> {
  emoji: string;
  color: string;
  title: string;
  totalTime: string;
  startTime: string;
  type: 'myRoutine' | 'communityMyRoutine' | 'communityRoutine' | 'create';
  completed?: boolean;
  like?: number;
}

const Routine = ({
  emoji,
  color,
  title,
  totalTime,
  startTime,
  type,
  completed,
  like,
}: RoutineProps): JSX.Element => {
  const backgroundColor = color;
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
    <RoutineContainer style={{ backgroundColor }}>
      <RoutineHeader>
        {type === 'myRoutine' ? (
          <CheckComplete completed={completed ? completed : false} />
        ) : (
          <div />
        )}

        {type === 'myRoutine' || type === 'communityMyRoutine' ? (
          <ToolBoxButton onClick={() => setVisible(true)}>
            <ToolBoxButtonIcon />
            {type === 'myRoutine' ? (
              <EditBox
                visible={visible}
                onClose={handleCloseToolBox}
                onClickUpdateButton={handleClickUpdateButton}
                onClickDeleteButton={handleClickDeleteButton}
              />
            ) : type === 'communityMyRoutine' ? (
              <DeleteBox
                visible={visible}
                onClose={handleCloseToolBox}
                onClickDeleteButton={handleClickDeleteButton}
              />
            ) : null}
          </ToolBoxButton>
        ) : type === 'communityRoutine' ? (
          <div>
            <Icon.Like color="#FFF" />
            <Like>{like ? like : 0}</Like>
          </div>
        ) : null}
      </RoutineHeader>
      <Emoji>{emoji ? emoji : '🌳'}</Emoji>
      <Title>{title ? title : '집 앞 공원 산책하기'}</Title>
      <TotalTime>{totalTime ? totalTime : '1시간'}</TotalTime>
      <StartTime>{startTime ? startTime : '오전 09:00'}</StartTime>
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
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

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

const ToolBoxButton = styled.button`
  background-color: inherit;
  border: none;
  padding: 0 0 0.5rem 0.5rem;
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

const defaultProps: RoutineProps = {
  emoji: '',
  color: Colors.red,
  title: '',
  totalTime: '',
  startTime: '',
  type: 'myRoutine',
  completed: false,
  like: 0,
};

Routine.defaultProps = defaultProps;

export type { RoutineProps };
export default Routine;
