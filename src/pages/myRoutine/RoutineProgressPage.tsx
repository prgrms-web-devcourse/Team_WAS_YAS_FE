import { useState } from 'react';
import {
  Container,
  Icon,
  IconButton,
  RoundedButton,
  RoutineInfo,
} from '@/components';
import styled from '@emotion/styled';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import TimeUtils from '@/utils/time';
import moment from 'moment';
import useInterval from '../../hooks/useInterval';
import { keyframes } from '@emotion/react';
import { RoutineProgressModal } from '@/components/organisms/RoutineProgressModal';

const DUMMY_ROUTINE_DETAIL: {
  id: string;
  emoji: string;
  color: string;
  name: string;
  durationTime: number;
  startTime: string;
  category: string[];
  missions: {
    id: string;
    emoji: string;
    color: string;
    name: string;
    durationTime: number;
    userDurationTime?: number;
  }[];
} = {
  id: '0',
  emoji: '🌳',
  color: Colors.indigo,
  name: '집 앞 공원 산책하기',
  durationTime: 14200,
  startTime: `${new Date().toISOString()}`,
  category: ['운동', '공부'],
  missions: [
    {
      id: '1',
      emoji: '🌳',
      color: Colors.indigo,
      name: '나무 구경하기',
      durationTime: 300,
    },
    {
      id: '2',
      emoji: '🥽',
      color: Colors.indigo,
      name: '수경 구경하기',
      durationTime: 700,
    },
    {
      id: '3',
      emoji: '🍖',
      color: Colors.indigo,
      name: '고기 구워 먹기',
      durationTime: 4200,
    },
    {
      id: '4',
      emoji: '📝',
      color: Colors.indigo,
      name: '공부하기',
      durationTime: 1800,
    },
    {
      id: '5',
      emoji: '📝',
      color: Colors.indigo,
      name: '공부하기',
      durationTime: 1800,
    },
    {
      id: '6',
      emoji: '📝',
      color: Colors.indigo,
      name: '공부하기',
      durationTime: 1800,
    },
    {
      id: '7',
      emoji: '📝',
      color: Colors.indigo,
      name: '공부하기',
      durationTime: 1800,
    },

    {
      id: '8',
      emoji: '📝',
      color: Colors.indigo,
      name: '공부하기',
      durationTime: 1800,
    },
  ],
};

const RoutineProgressPage = (): JSX.Element => {
  const [time] = useState(DUMMY_ROUTINE_DETAIL.missions[0].durationTime);
  const [duration, setDuration] = useState(
    moment.duration(time * 1000, 'milliseconds'),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextStep, setNextStep] = useState(false);
  const [prevStep, setPrevStep] = useState(false);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState<any>([
    ...DUMMY_ROUTINE_DETAIL.missions,
  ]);
  const [startTime, setStartTime] = useState(moment());

  const [toggle] = useInterval(() => {
    setDuration(
      moment.duration(duration.asMilliseconds() - 1000, 'milliseconds'),
    );
  }, 1000);

  const timeClass = duration.asMilliseconds() < 0 ? 'over' : '';
  const nextStepClass = nextStep ? 'nextStep' : '';
  const prevStepClass = prevStep ? 'prevStep' : '';

  const sleep = (time: number) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), time);
    });
  };

  const handleBackClick = async () => {
    if (currentIndex === 0 || prevStep || nextStep) return;

    setPrevStep(true);

    await sleep(300);
    setCurrentIndex((prevIndex) => {
      setDuration(
        moment.duration(
          DUMMY_ROUTINE_DETAIL.missions[prevIndex - 1].durationTime * 1000,
          'milliseconds',
        ),
      );
      return prevIndex - 1;
    });

    await sleep(300);
    setPrevStep(false);
  };

  const handleForwardClick = async () => {
    if (
      currentIndex === DUMMY_ROUTINE_DETAIL.missions.length - 1 ||
      prevStep ||
      nextStep
    )
      return;

    setNextStep(true);

    await sleep(300);
    setCurrentIndex((prevIndex) => {
      setDuration(
        moment.duration(
          DUMMY_ROUTINE_DETAIL.missions[prevIndex + 1].durationTime * 1000,
          'milliseconds',
        ),
      );
      return prevIndex + 1;
    });

    await sleep(300);
    setNextStep(false);
  };

  const handleCheckClick = async () => {
    const endTime = moment();
    const userDurationTime = Math.round(
      moment.duration(endTime.diff(startTime)).asSeconds(),
    );

    setProgress((prevProgress: any) => {
      const nextState = prevProgress.map((progress: any, index: number) => {
        if (index === currentIndex) {
          return {
            ...progress,
            userDurationTime,
          };
        }
        return progress;
      });
      return nextState;
    });

    setNextStep(true);

    await sleep(300);
    setCurrentIndex((prevIndex) => {
      setDuration(
        moment.duration(
          DUMMY_ROUTINE_DETAIL.missions[prevIndex + 1].durationTime * 1000,
          'milliseconds',
        ),
      );
      return prevIndex + 1;
    });

    await sleep(300);
    setNextStep(false);

    setStartTime(moment());
    console.log('endTime : ', endTime.toISOString());
    console.log('startTime : ', moment().toISOString());
  };

  return (
    <Container>
      <RoutineInfo routineObject={DUMMY_ROUTINE_DETAIL} />

      <MissionProgressContainer>
        {currentIndex !== 0 && <ArrowBack onClick={handleBackClick} />}

        <MissionContainer>
          <MissionProgress
            className={`${nextStepClass} ${prevStepClass}`}
            style={{ gridColumn: 2 }}
          >
            <Emoji>{DUMMY_ROUTINE_DETAIL.missions[currentIndex].emoji}</Emoji>
            <Title>{DUMMY_ROUTINE_DETAIL.missions[currentIndex].name}</Title>
            <Time className={timeClass}>
              {moment(Math.abs(duration.asMilliseconds())).format(
                duration.asHours() > 1 ? 'h:mm:ss' : 'mm:ss',
              )}
            </Time>
            <DurationTime>
              {TimeUtils.calculateTime(
                DUMMY_ROUTINE_DETAIL.missions[currentIndex].durationTime,
              )}
            </DurationTime>
          </MissionProgress>
        </MissionContainer>

        {DUMMY_ROUTINE_DETAIL.missions.length - 1 !== currentIndex && (
          <ArrowForward onClick={handleForwardClick} />
        )}
      </MissionProgressContainer>

      <RoutineProgressButton onClick={() => setVisible(true)} />
      <RoutineProgressModal
        visible={visible}
        onClose={() => setVisible(false)}
        missionObject={progress}
      />

      <ButtonContainer>
        <RoundedButton.Play onClick={toggle} />
        <IconButton.Check onClick={handleCheckClick} />
      </ButtonContainer>
    </Container>
  );
};

export default RoutineProgressPage;

const textShakeAnimation = keyframes`
  0%   {left: 0px;}
  20%  {left: 10px;}
  40%  {left: -10px;}
  60%  {left: 10px;}
  80%  {left: -10px;}
  100% {left: 0;}
`;

const nextStepAnimation = keyframes`
  0%   {transform: translateX(0);}
  49%  {transform: translateX(-200%);}
  50%  {transform: translateX(-200%); opacity: 0;}
  51%  {transform: translateX(200%); opacity: 0.2;}
  100% {transform: translateX(0); opacity: 1;}
`;

const prevStepAnimation = keyframes`
  0%   {transform: translateX(0);}
  49%  {transform: translateX(200%);}
  50%  {transform: translateX(200%); opacity: 0;}
  51%  {transform: translateX(-200%); opacity: 0.2;}
  100% {transform: translateX(0); opacity: 1;}
`;

const MissionProgressContainer = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  margin: 24px 0 40px;
`;

const MissionContainer = styled.div`
  width: 400px;
  height: 365px;
  overflow: hidden;
  grid-column: 2;

  @media ${Media.sm} {
    width: 200px;
    height: 180px;
  }
`;

const MissionProgress = styled.div`
  width: 365px;
  height: 365px;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #7373e2;
  color: white;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  &.nextStep {
    animation: ${nextStepAnimation} 0.6s;
  }
  &.prevStep {
    animation: ${prevStepAnimation} 0.6s;
  }

  @media ${Media.sm} {
    width: 180px;
    height: 180px;
  }
`;

const ArrowBack = styled(Icon.ArrowBack)`
  cursor: pointer;
  justify-self: flex-start;
`;

const ArrowForward = styled(Icon.ArrowForward)`
  cursor: pointer;
  justify-self: flex-end;
`;

const Emoji = styled.span`
  font-size: 3rem;

  @media ${Media.sm} {
    font-size: 2rem;
  }
`;

const Title = styled.h1`
  font-size: ${FontSize.large};
  font-weight: ${FontWeight.bold};

  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
`;

const Time = styled.p`
  font-size: 4rem;
  font-weight: ${FontWeight.bold};
  position: relative;

  &.over {
    margin-right: 1rem;
    &::before {
      content: '+';
      font-weight: ${FontWeight.regular};
    }
    color: ${Colors.functionNegative};
    animation: ${textShakeAnimation} 0.6s;
  }

  @media ${Media.sm} {
    font-size: 2rem;

    &.over {
      margin-right: 0.5rem;
    }
  }
`;

const DurationTime = styled.p`
  font-size: ${FontSize.medium};
  font-weight: ${FontWeight.bold};

  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
`;

const RoutineProgressButton = styled(Icon.List)`
  margin-bottom: 1rem;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 88px;
`;
