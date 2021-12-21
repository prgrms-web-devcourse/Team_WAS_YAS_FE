import { routineApi } from '@/apis';
import {
  Container,
  Routine,
  RoutineAddButton,
  TabBar,
  LoginGuide,
} from '@/components';
import { RoutineType as RT } from '@/Models';
import { Colors, FontSize, Media } from '@/styles';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

interface RoutineType extends RT {
  posted: boolean;
}

const MyRoutinePage = (): JSX.Element => {
  const [routines, setRoutines] = useState({
    all: [],
    finish: [],
    notFinish: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const token = sessionStorage.getItem('YAS_USER_TOKEN');

  const getMyRoutines = async () => {
    try {
      if (!token) return;
      setIsLoading(true);
      const routines = await routineApi.getRoutines();
      const finishedRoutines = await routineApi.getFinishedRoutines();
      const notFinishedRoutines = await routineApi.getNotFinishedRoutines();

      const finishedRoutineIds = finishedRoutines.data.data.map(
        (routine: { routineId: number }) => routine.routineId,
      );
      const allRoutinesExceptFinished = routines.data.data.filter(
        (routine: { routineId: number }) =>
          !finishedRoutineIds.includes(routine.routineId),
      );

      setRoutines({
        all: allRoutinesExceptFinished,
        finish: finishedRoutines.data.data,
        notFinish: notFinishedRoutines.data.data,
      });
      setIsLoading(false);
    } catch (e) {
      console.error('getMyRoutines: ', e);
    }
  };

  useEffect(() => {
    getMyRoutines();
    // eslint-disable-next-line
  }, []);

  const deleteRoutine = async (routine: RoutineType) => {
    const { routineId, name, posted } = routine;
    if (posted) {
      Swal.fire({
        icon: 'error',
        title: '이런, 루틴이 포스팅 되어있군요',
        text: '포스팅 되어있는 루틴을 먼저 삭제해주세요',
      });
    } else {
      Swal.fire({
        title: `${name}`,
        text: '루틴을 삭제하겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: `${Colors.functionPositive}`,
        cancelButtonColor: `${Colors.functionNegative}`,
        confirmButtonText: '네',
        cancelButtonText: '아니오',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await routineApi.deleteRoutine(routineId);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `${name}`,
              text: '루틴이 삭제되었습니다.',
              showConfirmButton: false,
              timer: 1200,
            });

            await getMyRoutines();
          } catch (e) {
            Swal.fire({
              icon: 'error',
              title: '이런',
              text: '에러로 인해 루틴이 삭제되지 않았어요!',
            });
          }
        }
      });
    }
  };

  const onClickUpdateRoutine = (routine: RoutineType) => {
    const { routineId, posted } = routine;
    if (posted) {
      Swal.fire({
        icon: 'error',
        title: '이런, 루틴이 포스팅 되어있군요',
        text: '포스팅 되어있는 루틴을 먼저 삭제해주세요',
      });
    } else {
      history.push(`/routine/${routineId}/update`);
    }
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
          {isLoading ? null : token ? (
            routines.all.length !== 0 ? (
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
                        onClickUpdateRoutine(routine);
                      }}
                    />
                  ))}
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
                        onClickUpdateRoutine(routine);
                      }}
                    />
                  ))}
              </RoutineGridBox>
            ) : (
              <MessageContainer>
                <Emoji>😭</Emoji>
                <Text>루틴이 없습니다</Text>
                <Text>플러스 버튼을 눌러 루틴을 생성해볼까요?</Text>
              </MessageContainer>
            )
          ) : (
            <LoginGuide />
          )}
        </TabBar.Item>
        <TabBar.Item title="오늘의 루틴" index="1">
          {isLoading ? null : token ? (
            routines.notFinish.length !== 0 ? (
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
                        onClickUpdateRoutine(routine);
                      }}
                    />
                  ))}
              </RoutineGridBox>
            ) : (
              <MessageContainer>
                <Emoji>😭</Emoji>
                <Text>오늘의 루틴이 없습니다</Text>
                <Text>플러스 버튼을 눌러 루틴을 생성해볼까요?</Text>
              </MessageContainer>
            )
          ) : (
            <LoginGuide />
          )}
        </TabBar.Item>
        <TabBar.Item title="완료한 루틴" index="2">
          {isLoading ? null : token ? (
            routines.finish.length !== 0 ? (
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
                        onClickUpdateRoutine(routine);
                      }}
                    />
                  ))}
              </RoutineGridBox>
            ) : (
              <MessageContainer>
                <Emoji>😭</Emoji>
                <Text>아직 완료한 루틴이 없습니다</Text>
                <Text>루틴을 진행해주세요!</Text>
              </MessageContainer>
            )
          ) : (
            <LoginGuide />
          )}
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
  right: calc(50% - 280px);
  bottom: 116px;

  @media ${Media.sm} {
    right: 1rem;
    bottom: 80px;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  height: 500px;
  > p {
    margin: 1rem 0;
    color: ${Colors.textTertiary};
  }
  @media ${Media.sm} {
    font-size: ${FontSize.medium};
  }
  @media ${Media.md} {
    font-size: 2rem;
  }
  @media ${Media.lg} {
    font-size: 2rem;
  }
`;

const Emoji = styled.p`
  font-size: 48px;
`;

const Text = styled.p`
  font-size: ${FontSize.medium};
  color: ${Colors.textSecondary};
`;
