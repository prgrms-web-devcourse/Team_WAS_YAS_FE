import { useEffect, useState } from 'react';
import { Button, Container, RoutineInfo, RoutineProgress } from '@/components';
import { Colors, FontSize, FontWeight, Media } from '@/styles';
import styled from '@emotion/styled';
import { useHistory, useParams } from 'react-router-dom';
import { missionStatusApi, routineApi } from '@/apis';
import Swal from 'sweetalert2';

interface RoutineInfoType {
  emoji: string;
  name: string;
  durationGoalTime: number;
}

const RoutineFinishPage = (): JSX.Element => {
  const history = useHistory();
  const params = useParams();
  const routineId = params['id'] && +params['id'];
  const [todayMissionStatus, setTodayMissionStatus] = useState<any>([]);
  const [routineInfo, setRoutineInfo] = useState<any>([]);

  const getFinishedRoutineDetail = async () => {
    if (!routineId) return;
    try {
      const notFinishedRoutines = await routineApi.getNotFinishedRoutines();
      const notFinishedRoutineIds = notFinishedRoutines.data.data.map(
        (routine: { routineId: number }) => routine.routineId,
      );

      if (notFinishedRoutineIds.includes(routineId)) {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: '루틴을 수행하지 않았네요!',
          text: '해당 루틴페이지로 이동합니다',
          showConfirmButton: false,
          timer: 2000,
        });
        history.replace(`/routine/${routineId}`);
      } else {
        const result = await missionStatusApi.getMissionStatus(routineId);
        const missionStatus = result.data.data
          ?.filter(
            (status: {
              missionStatusDetailResponse: { startTime: string };
            }) => {
              const missionDate = new Date(
                status.missionStatusDetailResponse.startTime,
              ).toLocaleDateString();
              const today = new Date().toLocaleDateString();

              return missionDate === today;
            },
          )
          .map(
            (status: {
              missionStatusDetailResponse: {
                userDurationTime: number;
                endTime: string | null;
              };
            }) => {
              const { userDurationTime, endTime } =
                status.missionStatusDetailResponse;

              return {
                ...status,
                userDurationTime: endTime === null ? null : userDurationTime,
                isPassed: endTime === null ? true : false,
              };
            },
          )
          .sort(
            (a: { orders: number }, b: { orders: number }) =>
              a.orders - b.orders,
          );

        setTodayMissionStatus(missionStatus);
      }
    } catch (e) {
      console.error('getFinishedRoutineDetail: ', e);
    }
  };

  const getRoutineInfo = async () => {
    if (!routineId) return;
    try {
      const result = await routineApi.getRoutine(routineId);
      const routineInfo: RoutineInfoType = {
        emoji: result.data.data.emoji,
        name: result.data.data.name,
        durationGoalTime: result.data.data.durationGoalTime,
      };
      setRoutineInfo(routineInfo);
    } catch (e) {
      console.error('getRoutineInfo: ', e);
    }
  };

  useEffect(() => {
    getFinishedRoutineDetail();
    getRoutineInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Title>루틴 요약</Title>
      <RoutineInfo routineObject={routineInfo} />
      <RoutineProgressContainer>
        <StyledRoutineProgress>
          <RoutineProgress missionObject={todayMissionStatus} />
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
