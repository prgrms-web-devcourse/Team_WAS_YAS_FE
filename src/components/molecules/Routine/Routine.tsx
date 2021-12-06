import { DeleteBox, EditBox, Icon } from '@/components';
import { Colors, FontSize, FontWeight } from '@/styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';

interface RoutineProps extends React.ComponentProps<'div'> {
  emoji?: string;
  color?: string;
  title?: string;
  totalTime?: string;
  startTime?: string;
  type: 'myRoutine' | 'communityMyRoutine' | 'communityRoutine' | 'create';
  completed: boolean;
  like: number;
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
          completed ? (
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 12.4492L10 15.4492L15 9.44922"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 21.9492C16.5228 21.9492 21 17.4721 21 11.9492C21 6.42637 16.5228 1.94922 11 1.94922C5.47715 1.94922 1 6.42637 1 11.9492C1 17.4721 5.47715 21.9492 11 21.9492Z"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          )
        ) : (
          <div />
        )}

        {type === 'myRoutine' || type === 'communityMyRoutine' ? (
          <ToolBoxButton onClick={() => setVisible(true)}>
            <svg
              width="5"
              height="18"
              viewBox="0 0 5 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.13281 2.63893C4.1329 2.89079 4.08125 3.1402 3.98082 3.37292C3.88039 3.60564 3.73314 3.81711 3.54748 3.99525C3.36182 4.1734 3.14139 4.31474 2.89877 4.41119C2.65615 4.50765 2.3961 4.55734 2.13346 4.55742C1.87081 4.5575 1.61072 4.50797 1.36804 4.41167C1.12536 4.31536 0.90483 4.17416 0.719053 3.99612C0.533276 3.81809 0.385887 3.60671 0.2853 3.37406C0.184713 3.1414 0.132897 2.89202 0.132813 2.64017C0.132642 2.13152 0.343193 1.64363 0.718145 1.28385C1.0931 0.924061 1.60174 0.721843 2.13217 0.72168C2.6626 0.721516 3.17138 0.92342 3.54657 1.28298C3.92176 1.64253 4.13264 2.13028 4.13281 2.63893V2.63893Z"
                fill="white"
              />
              <path
                d="M2.13217 11.1387C3.23638 11.1387 4.13153 10.2803 4.13153 9.22145C4.13153 8.16258 3.23638 7.3042 2.13217 7.3042C1.02795 7.3042 0.132812 8.16258 0.132812 9.22145C0.132812 10.2803 1.02795 11.1387 2.13217 11.1387Z"
                fill="white"
              />
              <path
                d="M2.13217 17.7212C3.23638 17.7212 4.13153 16.8628 4.13153 15.804C4.13153 14.7451 3.23638 13.8867 2.13217 13.8867C1.02795 13.8867 0.132812 14.7451 0.132812 15.804C0.132812 16.8628 1.02795 17.7212 2.13217 17.7212Z"
                fill="white"
              />
            </svg>
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
`;

const RoutineHeader = styled.header`
  display: flex;
  justify-content: space-between;
  height: 1.25rem;
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
`;

const Emoji = styled.div`
  font-size: 3rem;
  height: 3rem;
  margin: 1rem 0 1.5rem;
`;

const Title = styled.h1`
  font-size: ${FontSize.large};
  font-weight: ${FontWeight.bold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TotalTime = styled.h2`
  font-size: ${FontSize.medium};
  font-weight: ${FontWeight.bold};
  margin: 0.75rem 0 1.75rem;
`;

const StartTime = styled.h3`
  font-size: ${FontSize.micro};
  font-weight: ${FontWeight.bold};
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
