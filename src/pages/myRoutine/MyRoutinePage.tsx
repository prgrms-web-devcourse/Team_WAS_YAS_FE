import { routineApi } from '@/apis';
import { Container, Routine, RoutineAddButton, TabBar } from '@/components';
import { RoutineType } from '@/Models';
import { Media } from '@/styles';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const MyRoutinePage = (): JSX.Element => {
  const [routines, setRoutines] = useState({
    all: [],
    finish: [],
    notFinish: [],
  });
  const history = useHistory();

  const getMyRoutines = async () => {
    const routines = await routineApi.getRoutines();
    const finishedRoutines = await routineApi.getFinishedRoutines();
    const notFinishedRoutines = await routineApi.getNotFinishedRoutines();

    setRoutines({
      all: routines.data.data,
      finish: finishedRoutines.data.data,
      notFinish: notFinishedRoutines.data.data,
    });
  };

  useEffect(() => {
    getMyRoutines();
  }, []);

  const deleteRoutine = async (routine: RoutineType) => {
    const { routineId, name } = routine;

    try {
      await routineApi.deleteRoutine(routineId);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${name}`,
        text: '루틴이 삭제되었습니다.',
        showConfirmButton: false,
        timer: 1500,
      });

      await getMyRoutines();
    } catch (e) {
      console.error(e);
    }
  };

  const onClickUpdateRoutine = (routineId: number) => {
    history.push(`/routine/${routineId}/update`);
  };

  const onClickRoutine = (e: React.MouseEvent<HTMLElement>, id: any) => {
    const element = e.target as HTMLElement;

    if (
      !(
        element.tagName === 'svg' ||
        element.tagName === 'path' ||
        element?.className.includes('ToolBox')
      )
    ) {
      history.push(`/routine/${id}`);
    }
  };
  return (
    <Container navBar>
      <TabBar type="myRoutine">
        <TabBar.Item title="전체" index="0">
          <RoutineGridBox>
            {routines.all &&
              routines.all?.map((routine) => (
                <Routine
                  onClick={(e) => onClickRoutine(e, routine['routineId'])}
                  key={routine['routineId']}
                  routineObject={routine}
                  type="myRoutine"
                  completed={false}
                  deleteRoutine={() => {
                    deleteRoutine(routine);
                  }}
                  updateRoutine={() => {
                    onClickUpdateRoutine(routine['routineId']);
                  }}
                />
              ))}
          </RoutineGridBox>
        </TabBar.Item>
        <TabBar.Item title="오늘의 루틴" index="1">
          <RoutineGridBox>
            {routines.notFinish &&
              routines.notFinish?.map((routine) => (
                <Routine
                  onClick={(e) => onClickRoutine(e, routine['routineId'])}
                  key={routine['routineId']}
                  routineObject={routine}
                  type="myRoutine"
                  completed={false}
                  deleteRoutine={() => {
                    deleteRoutine(routine);
                  }}
                  updateRoutine={() => {
                    onClickUpdateRoutine(routine['routineId']);
                  }}
                />
              ))}
          </RoutineGridBox>
        </TabBar.Item>
        <TabBar.Item title="완료한 루틴" index="2">
          <RoutineGridBox>
            {routines.finish &&
              routines.finish?.map((routine) => (
                <Routine
                  onClick={(e) => onClickRoutine(e, routine['routineId'])}
                  key={routine['routineId']}
                  routineObject={routine}
                  type="myRoutine"
                  completed={true}
                  deleteRoutine={() => {
                    deleteRoutine(routine);
                  }}
                  updateRoutine={() => {
                    onClickUpdateRoutine(routine['routineId']);
                  }}
                />
              ))}
          </RoutineGridBox>
        </TabBar.Item>
      </TabBar>
      <StyledRoutineAddButton />
    </Container>
  );
};

export default MyRoutinePage;

const RoutineGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  gap: 32px 56px;
  padding: 40px 0;
  width: 100%;

  @media ${Media.sm} {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px 14px;
    padding: 20px 0;

    @media (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const StyledRoutineAddButton = styled(RoutineAddButton)`
  position: fixed;
  right: calc(50% - 266px);
  bottom: 116px;

  @media ${Media.sm} {
    right: calc(50% - 140px);
    bottom: 62px;
  }
`;
