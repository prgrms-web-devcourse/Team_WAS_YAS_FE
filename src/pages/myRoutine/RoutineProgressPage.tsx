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
import 'moment/locale/ko';
import useInterval from '../../hooks/useInterval';
import { keyframes } from '@emotion/react';
import { RoutineProgressModal } from '@/components/organisms/RoutineProgressModal';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';

const DUMMY_ROUTINE_DETAIL = {
  routineId: 1,
  emoji: '🌳',
  color: Colors.indigo,
  title: '집 앞 공원 산책하기',
  durationGoalTime: 14200,
  startGoalTime: `${new Date().toISOString()}`,
  routineCategories: ['운동', '공부'],
  missions: [
    {
      missionId: 1,
      emoji: '🌳',
      color: Colors.indigo,
      title: '나무 구경하기',
      durationGoalTime: 300,
    },
    {
      missionId: 2,
      emoji: '🥽',
      color: Colors.indigo,
      title: '수경 구경하기',
      durationGoalTime: 700,
    },
    {
      missionId: 3,
      emoji: '🍖',
      color: Colors.indigo,
      title: '고기 구워 먹기',
      durationGoalTime: 4200,
    },
    {
      missionId: 4,
      emoji: '📝',
      color: Colors.indigo,
      title: '공부하기',
      durationGoalTime: 1800,
    },
    {
      missionId: 5,
      emoji: '📝',
      color: Colors.indigo,
      title: '공부하기',
      durationGoalTime: 1800,
    },
    {
      missionId: 6,
      emoji: '📝',
      color: Colors.indigo,
      title: '공부하기',
      durationGoalTime: 1800,
    },
    {
      missionId: 7,
      emoji: '📝',
      color: Colors.indigo,
      title: '공부하기',
      durationGoalTime: 1800,
    },

    {
      missionId: 8,
      emoji: '📝',
      color: Colors.indigo,
      title: '공부하기',
      durationGoalTime: 1800,
    },
  ],
};

const RoutineProgressPage = (): JSX.Element => {
  const history = useHistory();
  const [time] = useState(DUMMY_ROUTINE_DETAIL.missions[0].durationGoalTime);
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
  const [isPlay, setIsPlay] = useState(true);

  const toggle = useInterval(
    () => {
      setDuration(
        moment.duration(duration.asMilliseconds() - 1000, 'milliseconds'),
      );
    },
    1000,
    (isStop: boolean) => {
      if (isStop) {
        setIsPlay(false);
      } else {
        setIsPlay(true);
      }
    },
  );

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

    Swal.fire({
      title: '이전 미션으로 되돌아갈까요?',
      text: '미션이 다시 시작되고 미션 완료 시 기록이 변경됩니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: `${Colors.functionPositive}`,
      cancelButtonColor: `${Colors.functionNegative}`,
      confirmButtonText: '네',
      cancelButtonText: '아니오',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setPrevStep(true);

        await sleep(450);
        if (!isPlay) {
          setIsPlay(true);
          toggle();
        }
        setCurrentIndex((prevIndex) => {
          setDuration(
            moment.duration(
              DUMMY_ROUTINE_DETAIL.missions[prevIndex - 1].durationGoalTime *
                1000,
              'milliseconds',
            ),
          );
          return prevIndex - 1;
        });
        setStartTime(moment());

        await sleep(450);
        setPrevStep(false);
      }
    });
  };

  const handleForwardClick = async () => {
    if (
      currentIndex === DUMMY_ROUTINE_DETAIL.missions.length - 1 ||
      prevStep ||
      nextStep
    )
      return;

    setNextStep(true);

    await sleep(450);
    if (!isPlay) {
      setIsPlay(true);
      toggle();
    }
    setCurrentIndex((prevIndex) => {
      setDuration(
        moment.duration(
          DUMMY_ROUTINE_DETAIL.missions[prevIndex + 1].durationGoalTime * 1000,
          'milliseconds',
        ),
      );
      return prevIndex + 1;
    });
    setStartTime(moment());

    await sleep(450);
    setNextStep(false);
  };

  const handleCheckClick = async () => {
    const endTime = moment();
    const userDurationTime =
      DUMMY_ROUTINE_DETAIL.missions[currentIndex].durationGoalTime -
      duration.asSeconds();

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${DUMMY_ROUTINE_DETAIL.missions[currentIndex].title} 완료`,
      html: `<i style="color: ${Colors.functionNegative}">${
        TimeUtils.calculateTime(userDurationTime) || '0초'
      }</i>`,
      showConfirmButton: false,
      timer: 1200,
    });

    if (currentIndex === DUMMY_ROUTINE_DETAIL.missions.length - 1) {
      history.push(`/routine/${DUMMY_ROUTINE_DETAIL.routineId}/finish`);
    }

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

    await sleep(450);
    if (!isPlay) {
      setIsPlay(true);
      toggle();
    }
    setCurrentIndex((prevIndex) => {
      setDuration(
        moment.duration(
          DUMMY_ROUTINE_DETAIL.missions[prevIndex + 1].durationGoalTime * 1000,
          'milliseconds',
        ),
      );
      return prevIndex + 1;
    });

    await sleep(450);
    setNextStep(false);

    setStartTime(moment());
    console.log('이전 미션 startTime : ', startTime.toISOString());
    console.log('이전 미션 endTime : ', endTime.toISOString());
    console.log('다음 미션 startTime : ', moment().toISOString());
  };

  return (
    <Container>
      <RoutineInfo routineObject={DUMMY_ROUTINE_DETAIL} />

      <MissionProgressContainer>
        {currentIndex !== 0 ? <ArrowBack onClick={handleBackClick} /> : <div />}

        <MissionProgress
          className={`${nextStepClass} ${prevStepClass}`}
          style={{ gridColumn: 2 }}
        >
          <Emoji>{DUMMY_ROUTINE_DETAIL.missions[currentIndex].emoji}</Emoji>
          <Title>{DUMMY_ROUTINE_DETAIL.missions[currentIndex].title}</Title>
          <Time className={timeClass}>
            {TimeUtils.formatCalendarTime(duration)}
          </Time>
          <DurationTime>
            {TimeUtils.calculateTime(
              DUMMY_ROUTINE_DETAIL.missions[currentIndex].durationGoalTime,
            )}
          </DurationTime>
        </MissionProgress>

        {DUMMY_ROUTINE_DETAIL.missions.length - 1 !== currentIndex ? (
          <ArrowForward onClick={handleForwardClick} />
        ) : (
          <div />
        )}
      </MissionProgressContainer>

      <RoutineProgressButton onClick={() => setVisible(true)} />
      <RoutineProgressModal
        visible={visible}
        onClose={() => setVisible(false)}
        missionObject={progress}
      />

      <ButtonContainer>
        <RoundedButton.Play isPlay={isPlay} onClick={toggle} />
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
  overflow: hidden;
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
    animation: ${nextStepAnimation} 0.9s;
  }
  &.prevStep {
    animation: ${prevStepAnimation} 0.9s;
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
