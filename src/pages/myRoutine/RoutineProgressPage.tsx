import { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Icon,
  IconButton,
  RoundedButton,
  RoutineInfo,
  Spinner,
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
import { useHistory, useParams } from 'react-router-dom';
import { MissionCompletionType, MissionType } from '@/Models';
import { missionStatusApi, routineApi } from '@/apis';

const RoutineProgressPage = (): JSX.Element => {
  const history = useHistory();
  const [duration, setDuration] = useState(moment.duration(0, 'milliseconds'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextStep, setNextStep] = useState(false);
  const [prevStep, setPrevStep] = useState(false);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState([]);
  const [isPlay, setIsPlay] = useState(true);
  const [routine, setRoutine] = useState<any>({});
  const [missions, setMissions] = useState<any>([]);
  const [currentMissions, setCurrentMissions] = useState<any>({});
  const [routineStatusId, setRoutineStatusId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // 예외처리
  const { id } = useParams<Record<string, string>>();
  const routineId = id && parseInt(id);

  const createRoutineProgress = async () => {
    try {
      if (!routineId) return;
      setIsLoading(true);
      const finishedRoutines = await routineApi.getFinishedRoutines();
      const finishedRoutineIds = finishedRoutines.data.data.map(
        (routine: { routineId: number }) => routine.routineId,
      );

      if (finishedRoutineIds.includes(routineId)) {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: '오늘 루틴을 수행했군요!',
          text: '결과 페이지로 이동합니다',
          showConfirmButton: false,
          timer: 2000,
        });
        history.replace(`/routine/${routineId}/finish`);
        return false;
      } else {
        const result = await missionStatusApi.createMissionStatus(routineId);
        return result.data.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getRoutineDetail = async () => {
    try {
      if (!routineId) return;
      const createdRoutineStatus = await createRoutineProgress();

      if (!createdRoutineStatus) return;

      const {
        missionMissionStatusIds,
        routineStatusId,
      }: {
        missionMissionStatusIds: {
          missionId: number;
          missionStatusId: number;
        }[];
        routineStatusId: number;
      } = createdRoutineStatus;

      setRoutineStatusId(routineStatusId);

      const result = await routineApi.getRoutine(routineId);
      const routineInfo = { ...result.data.data, weeks: undefined };
      const missionInfo = result.data.data.missionDetailResponses
        .sort(
          (a: { orders: number }, b: { orders: number }) => a.orders - b.orders,
        )
        .map((mission: MissionCompletionType) => {
          const missionStatusId = missionMissionStatusIds.filter(
            (status: { missionId: number }) =>
              status['missionId'] === mission['missionId'],
          )[0];
          return {
            ...mission,
            userDurationTime: null,
            missionStatusId:
              missionStatusId && missionStatusId['missionStatusId'],
          };
        });

      setRoutine(routineInfo);
      setMissions(missionInfo);
      setDuration(
        moment.duration(missionInfo[0].durationGoalTime * 1000, 'milliseconds'),
      );
      setProgress(missionInfo);
      setCurrentMissions(missionInfo[0]);
      await startMission(missionInfo[0], routineStatusId);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const startMission = async (
    currentMission: {
      missionStatusId: number;
      orders: number;
    },
    routine_StatusId?: number,
  ) => {
    try {
      if (!routineId) return;
      const missionStatus = {
        routineStatusId: routine_StatusId ? routine_StatusId : routineStatusId,
        missionStatusId: currentMission['missionStatusId'],
        orders: currentMission['orders'],
        startTime: moment().toISOString(),
        userDurationTime: 0,
      };
      await missionStatusApi.updateMissionStatus(routineId, missionStatus);
    } catch (e) {
      console.error('startMission: ', e);
    }
  };

  const startPrevMission = async (currentMission: {
    missionStatusId: number;
    orders: number;
  }) => {
    try {
      if (!routineId) return;
      const missionStatus = {
        routineStatusId: routineStatusId,
        missionStatusId: currentMission['missionStatusId'],
        orders: currentMission['orders'],
        startTime: moment().toISOString(),
        userDurationTime: 0,
      };
      await missionStatusApi.updateMissionStatus(routineId, missionStatus);
    } catch (e) {
      console.error('startPrevMission: ', e);
    }
  };

  const endMission = async (userDurationTime: number) => {
    try {
      if (!routineId) return;
      const missionStatus = {
        routineStatusId: routineStatusId,
        missionStatusId: currentMissions['missionStatusId'],
        orders: currentMissions['orders'],
        endTime: moment().toISOString(),
        userDurationTime,
      };
      await missionStatusApi.updateMissionStatus(routineId, missionStatus);
    } catch (e) {
      console.error('endMission: ', e);
    }
  };

  useEffect(() => {
    getRoutineDetail();
    // eslint-disable-next-line
  }, []);

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
  const isPlayClass = isPlay ? '' : 'stopped';
  const nextStepClass = nextStep ? 'nextStep' : '';
  const prevStepClass = prevStep ? 'prevStep' : '';
  const backgroundColor = routine['color'];

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

        setProgress((prevProgress: any) => {
          const nextState = prevProgress.map((progress: any, index: number) => {
            if (index === currentIndex - 1) {
              return {
                ...progress,
                isPassed: undefined,
                userDurationTime: null,
              };
            }
            return progress;
          });
          return nextState;
        });

        setCurrentIndex((prevIndex) => {
          setDuration(
            moment.duration(
              missions[prevIndex - 1]['durationGoalTime'] * 1000,
              'milliseconds',
            ),
          );
          setCurrentMissions(missions[prevIndex - 1]);
          return prevIndex - 1;
        });

        await sleep(450);
        setPrevStep(false);

        await startPrevMission(missions[currentIndex - 1]);
      }
    });
  };

  const handleForwardClick = async () => {
    if (prevStep || nextStep) return;

    Swal.fire({
      title: '이번 미션을 건너뛸까요?',
      text: '미션을 진행하지 않은 것으로 기록됩니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: `${Colors.functionPositive}`,
      cancelButtonColor: `${Colors.functionNegative}`,
      confirmButtonText: '네',
      cancelButtonText: '아니오',
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (currentIndex === missions.length - 1) {
          history.replace(`/routine/${routineId}/finish`);
          return;
        }

        setNextStep(true);

        await sleep(450);
        if (!isPlay) {
          setIsPlay(true);
          toggle();
        }

        setProgress((prevProgress: any) => {
          const nextState = prevProgress.map((progress: any, index: number) => {
            if (index === currentIndex) {
              return {
                ...progress,
                isPassed: true,
              };
            }
            return progress;
          });
          return nextState;
        });

        setCurrentIndex((prevIndex) => {
          setDuration(
            moment.duration(
              missions[prevIndex + 1]['durationGoalTime'] * 1000,
              'milliseconds',
            ),
          );
          setCurrentMissions(missions[prevIndex + 1]);
          return prevIndex + 1;
        });

        await sleep(450);
        setNextStep(false);

        await startMission(missions[currentIndex + 1]);
      }
    });
  };

  const handleCheckClick = async () => {
    if (nextStep || prevStep) return;
    const userDurationTime =
      missions[currentIndex]['durationGoalTime'] - duration.asSeconds();
    await endMission(userDurationTime);

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${missions[currentIndex]['name']} 완료`,
      html: `<i style="color: ${Colors.functionNegative}">${
        TimeUtils.calculateTime(userDurationTime) || '0초'
      }</i>`,
      showConfirmButton: false,
      timer: 1200,
    });

    if (currentIndex === missions.length - 1) {
      history.replace(`/routine/${routineId}/finish`);
      return;
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
          missions[prevIndex + 1]['durationGoalTime'] * 1000,
          'milliseconds',
        ),
      );
      setCurrentMissions(missions[prevIndex + 1]);
      return prevIndex + 1;
    });

    await sleep(450);
    setNextStep(false);

    if (currentIndex !== missions.length - 1) {
      await startMission(missions[currentIndex + 1]);
    }
  };

  const ProgressModalEmement = useMemo(() => {
    return (
      <RoutineProgressModal
        visible={visible}
        onClose={() => setVisible(false)}
        missionObject={progress}
      />
    );
  }, [visible, progress]);

  return (
    <Container>
      <RoutineInfo routineObject={routine} />

      <MissionProgressContainer>
        {currentIndex !== 0 ? <ArrowBack onClick={handleBackClick} /> : <div />}

        <MissionProgress
          style={{ backgroundColor }}
          className={`${nextStepClass} ${prevStepClass}`}
        >
          <Emoji>{currentMissions['emoji']}</Emoji>
          <Title>{currentMissions['name']}</Title>
          <Time className={`${timeClass} ${isPlayClass}`}>
            {TimeUtils.formatCalendarTime(duration)}
          </Time>
          <DurationTime>
            {TimeUtils.calculateTime(currentMissions['durationGoalTime'])}
          </DurationTime>
        </MissionProgress>

        <ArrowForward onClick={handleForwardClick} />
      </MissionProgressContainer>

      <RoutineProgressButton onClick={() => setVisible(true)} />
      {ProgressModalEmement}

      <ButtonContainer>
        <RoundedButton.Play isPlay={isPlay} onClick={toggle} />
        <IconButton.Check onClick={handleCheckClick} />
      </ButtonContainer>
      {isLoading && <Spinner />}
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
  height: 380px;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  margin: 24px 0 40px;
  overflow: hidden;

  @media ${Media.sm} {
    height: 190px;
  }
`;

const MissionProgress = styled.div<Partial<MissionType>>`
  width: 365px;
  height: 365px;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-evenly;
  color: white;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  grid-column: 2;

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
  transition: transform 0.2s ease-in-out;

  &.over {
    margin-right: 1rem;
    &::before {
      content: '+';
      font-weight: ${FontWeight.regular};
    }
    color: ${Colors.functionNegative};
    animation: ${textShakeAnimation} 0.6s;
  }

  &.stopped {
    color: ${Colors.textSecondary};
    transform: scale(1.1);
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
