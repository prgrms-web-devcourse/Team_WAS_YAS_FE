import { missionApi, routineApi } from '@/apis';
import {
  Button,
  Container,
  DraggableMission,
  IconButton,
  RoundedButton,
  RoutineCategory,
  RoutineInfo,
} from '@/components';
import { ROUTINE_CATEGORY } from '@/constants';
import { MissionCompletionType } from '@/Models';
import { Colors, Media } from '@/styles';
import styled from '@emotion/styled';
import { useEffect, useCallback, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Swal from 'sweetalert2';

interface RoutineDetail {
  color: string;
  emoji: string;
  missionDetailResponses: MissionCompletionType[];
  name: string;
  routineCategory: string[];
}

const RoutineDetailPage = (): JSX.Element => {
  // 예외처리
  const { id } = useParams<Record<string, string>>();
  const routineId = id && parseInt(id);
  const [routine, setRoutine] = useState<Partial<RoutineDetail>>({});
  const [missions, setMissions] = useState<any>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [missionIsEmpty, setMissionIsEmpty] = useState(false);
  const [isTodayRoutine, setIsTodayRoutine] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const history = useHistory();

  const updateMission = useCallback(async () => {
    const updatedMission: any = {
      missionOrders: missions.map(
        (mission: { missionId: number }, i: number) => {
          return { missionId: mission.missionId, orders: i };
        },
      ),
    };

    try {
      if (!routineId || isPosted) return;
      await missionApi.updateMission(routineId, updatedMission);
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: '🥲 oops!',
        text: `${e}`,
        confirmButtonColor: Colors.point,
      });
    }
  }, [missions, routineId, isPosted]);

  const getRoutineDetail = async () => {
    try {
      if (!routineId) return;
      const result = await routineApi.getRoutine(routineId);
      setIsPosted(result.data.data.posted);
      const routineInfo = result.data.data;
      const missionInfo = result.data.data.missionDetailResponses.sort(
        (a: { orders: number }, b: { orders: number }) => a.orders - b.orders,
      );

      if (missionInfo.length === 0) {
        setMissionIsEmpty(true);
      } else {
        setMissionIsEmpty(false);
      }

      setRoutine(routineInfo);

      for (let i = 0; i < missionInfo.length; i++) {
        if (missionInfo[i].orders !== i) {
          await updateMission();
          break;
        }
      }

      setMissions([...missionInfo]);
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: '🥲 oops!',
        text: `${e}`,
        confirmButtonColor: Colors.point,
      });
    }
  };

  const getMyRoutines = async () => {
    const finishedRoutines = await routineApi.getFinishedRoutines();
    const notFinishedRoutines = await routineApi.getNotFinishedRoutines();

    const finishedRoutineIds = finishedRoutines.data.data.map(
      (routine: { routineId: number }) => routine.routineId,
    );
    const notFinishedRoutineIds = notFinishedRoutines.data.data.map(
      (routine: { routineId: number }) => routine.routineId,
    );

    if (finishedRoutineIds.includes(routineId)) {
      setIsFinished(true);
    }
    if (notFinishedRoutineIds.includes(routineId)) {
      setIsTodayRoutine(true);
    }
  };

  const deleteMission = async (mission: any) => {
    Swal.fire({
      title: `${mission.name}`,
      text: '미션을 삭제하겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: `${Colors.functionPositive}`,
      cancelButtonColor: `${Colors.functionNegative}`,
      confirmButtonText: '네',
      cancelButtonText: '아니오',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (!routineId) return;
          await missionApi.deleteMission(routineId, mission.missionId);
          await getRoutineDetail();

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${mission.name}`,
            text: '미션이 삭제되었습니다.',
            showConfirmButton: false,
            timer: 1200,
          });
        } catch (e) {
          Swal.fire({
            icon: 'error',
            title: '이런',
            text: '미션이 삭제되지 않았어요!',
          });
        }
      }
    });
  };

  useEffect(() => {
    getRoutineDetail();
    getMyRoutines();
    // eslint-disable-next-line
  }, []);

  const moveMission = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (isPosted) return;
      const dragMission = missions[dragIndex];
      setMissions(
        update(missions, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragMission],
          ],
        }),
      );
    },
    [missions, isPosted],
  );

  const startRoutine = () => {
    if (missionIsEmpty) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '미션이 없어요!',
        text: '미션을 생성해주세요',
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (!isTodayRoutine) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '오늘 수행 가능한 루틴이 아니에요',
        text: `${routine.name}의 요일을 확인해주세요`,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      history.push(`/routine/${routineId}/progress`);
    }
  };

  const moveToUpdatePage = () => {
    if (isPosted) {
      Swal.fire({
        icon: 'warning',
        title: '포스팅된 루틴은 수정할 수 없어요',
        text: `포스팅된 루틴을 먼저 삭제해주세요`,
      });
    } else {
      history.push(`/routine/${routineId}/update`);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <RoutineInfo routineObject={routine} />
        <CategoryEditFlexBox>
          <div>
            {routine.routineCategory?.map((category, i) => (
              <StyledCategory key={i}>
                {ROUTINE_CATEGORY[category]}
              </StyledCategory>
            ))}
          </div>
          <RoundedButton.Edit onClick={moveToUpdatePage} />
        </CategoryEditFlexBox>
        {missions.map((mission: any, index: number) => (
          <StyledMission
            deleteMission={() => {
              deleteMission(mission);
            }}
            updateMission={updateMission}
            index={index}
            moveMission={moveMission}
            type={isPosted ? 'create' : 'normal'}
            key={mission.missionId}
            missionObject={mission}
          />
        ))}

        {isFinished ? (
          <Link to={`/routine/${routineId}/finish`}>
            <StyledButton colorType="white">
              <Svg
                viewBox="0 0 24 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.7869 15.5913L3.69882 26.6667C2.0789 27.6057 0 26.4687 0 24.5758V2.42492C0 0.535018 2.0759 -0.604927 3.69882 0.337027L22.7869 11.4125C23.1554 11.6228 23.4617 11.9269 23.6747 12.2939C23.8878 12.6608 24 13.0776 24 13.5019C24 13.9262 23.8878 14.343 23.6747 14.7099C23.4617 15.0768 23.1554 15.3809 22.7869 15.5913Z"
                  fill="#565656"
                />
              </Svg>
            </StyledButton>
          </Link>
        ) : (
          <StyledButton colorType="white" onClick={startRoutine}>
            <Svg
              viewBox="0 0 24 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.7869 15.5913L3.69882 26.6667C2.0789 27.6057 0 26.4687 0 24.5758V2.42492C0 0.535018 2.0759 -0.604927 3.69882 0.337027L22.7869 11.4125C23.1554 11.6228 23.4617 11.9269 23.6747 12.2939C23.8878 12.6608 24 13.0776 24 13.5019C24 13.9262 23.8878 14.343 23.6747 14.7099C23.4617 15.0768 23.1554 15.3809 22.7869 15.5913Z"
                fill="#565656"
              />
            </Svg>
          </StyledButton>
        )}
        {!isPosted && (
          <Link to={`/routine/${routineId}/create`}>
            <StyledRoutineAddButton />
          </Link>
        )}
      </Container>
    </DndProvider>
  );
};

export default RoutineDetailPage;

const CategoryEditFlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  @media ${Media.sm} {
    margin: 1rem 0;
  }
`;

const StyledCategory = styled(RoutineCategory)`
  margin-right: 1rem;

  @media ${Media.sm} {
    margin-right: 8px;
    height: 20px;
  }
`;

const StyledMission = styled(DraggableMission)`
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  width: 200px;
  position: fixed;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);

  @media ${Media.sm} {
    width: 120px;
    bottom: 24px;
  }
`;

const StyledRoutineAddButton = styled(IconButton.Add)`
  position: fixed;
  right: calc(50% - 340px);
  bottom: 48px;
  @media ${Media.sm} {
    right: 24px;
    bottom: 24px;
  }
`;

const Svg = styled.svg`
  height: auto;
  @media ${Media.sm} {
    width: 18px;
  }
  @media ${Media.md} {
    width: 24px;
  }
  @media ${Media.lg} {
    width: 24px;
  }
`;
