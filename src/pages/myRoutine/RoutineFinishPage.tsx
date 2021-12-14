import React from 'react';
import { Button, Container, RoutineInfo, RoutineProgress } from '@/components';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

const RoutineFinishPage = (): JSX.Element => {
  const history = useHistory();
  const routineDummy = {
    emoji: '💪',
    title: '한강에서 산책하기',
    durationGoalTime: 12345,
  };
  const missionCompletionDummy: {
    id: string;
    emoji: string;
    name: string;
    durationTime: number;
    color: string;
    userDurationTime: number;
  }[] = [
    {
      id: '10',
      emoji: '🚿',
      name: '샤워하기',
      durationTime: 1200,
      color: Colors.red,
      userDurationTime: 1500,
    },
    {
      id: '11',
      emoji: '🪥',
      name: '양치하기',
      durationTime: 1200,
      color: Colors.red,
      userDurationTime: 1000,
    },
    {
      id: '12',
      emoji: '📝',
      name: '공부하기',
      durationTime: 1200,
      color: Colors.red,
      userDurationTime: 500,
    },
    {
      id: '13',
      emoji: '🥗',
      name: '밥먹기',
      durationTime: 1200,
      color: Colors.red,
      userDurationTime: 2500,
    },
    {
      id: '14',
      emoji: '📔',
      name: '독서하기',
      durationTime: 1200,
      color: Colors.red,
      userDurationTime: 1200,
    },
    {
      id: '15',
      emoji: '📚',
      name: '공부하기',
      durationTime: 1200,
      color: Colors.red,
      userDurationTime: 500,
    },
    {
      id: '16',
      emoji: '🎂',
      name: '밥먹기',
      durationTime: 1200,
      color: Colors.red,
      userDurationTime: 2500,
    },
    {
      id: '17',
      emoji: '📋',
      name: '독서하기',
      durationTime: 1200,
      color: Colors.red,
      userDurationTime: 1200,
    },
  ];
  return (
    <Container>
      <Title>루틴 요약</Title>
      <RoutineInfo routineObject={routineDummy} />
      <RoutineProgressContainer>
        <StyledRoutineProgress>
          <RoutineProgress missionObject={missionCompletionDummy} />
        </StyledRoutineProgress>
      </RoutineProgressContainer>
      <StyledButton onClick={() => history.push('/')}>종료하기</StyledButton>
    </Container>
  );
};

export default RoutineFinishPage;

const Title = styled.h1`
  margin: 1.5rem 0;
  @media ${Media.sm} {
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.medium};
  }
  @media ${Media.md} {
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.large};
  }
  @media ${Media.lg} {
    font-weight: ${FontWeight.medium};
    font-size: ${FontSize.large};
  }
`;

const RoutineProgressContainer = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Colors.backgroundModal};
  border-radius: 16px;
  max-height: 700px;
  margin-top: 2rem;
  overflow-y: auto;
`;

const StyledRoutineProgress = styled.div`
  margin: 3rem 0;
`;

const StyledButton = styled(Button)`
  position: fixed;
  bottom: 2rem;
  z-index: 1000;
  @media ${Media.sm} {
    max-width: 150px;
  }
  @media ${Media.md} {
    max-width: 270px;
  }
  @media ${Media.lg} {
    max-width: 270px;
  }
`;
