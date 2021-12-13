import { Container, Routine, RoutineAddButton, TabBar } from '@/components';
import { RoutineType } from '@/Models';
import { Colors, Media } from '@/styles';
import styled from '@emotion/styled';
import React from 'react';
import { useHistory } from 'react-router';

const DUMMY_ROUTINE: Partial<RoutineType>[] = [
  {
    routineId: 1,
    emoji: '🌳',
    color: Colors.red,
    title: '집 앞 공원 산책하기',
    durationGoalTime: 10000,
    startGoalTime: `${new Date().toISOString()}`,
  },
  {
    routineId: 2,
    emoji: '🥽',
    color: Colors.brown,
    title: '물 2L 마시기',
    durationGoalTime: 780,
    startGoalTime: `${new Date(2021, 12, 8, 12, 0).toISOString()}`,
  },
  {
    routineId: 3,
    emoji: '🍖',
    color: Colors.indigo,
    title: '아침 만들어 먹기',
    durationGoalTime: 4200,
    startGoalTime: `${new Date(2021, 12, 8, 6, 30).toISOString()}`,
  },
  {
    routineId: 4,
    emoji: '📝',
    color: Colors.pink,
    title: '공부하기',
    durationGoalTime: 1800,
    startGoalTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
  },
  {
    routineId: 5,
    emoji: '📝',
    color: Colors.pink,
    title: '공부하기',
    durationGoalTime: 1800,
    startGoalTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
  },
  {
    routineId: 6,
    emoji: '📝',
    color: Colors.pink,
    title: '공부하기',
    durationGoalTime: 1800,
    startGoalTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
  },
  {
    routineId: 7,
    emoji: '📝',
    color: Colors.pink,
    title: '공부하기',
    durationGoalTime: 1800,
    startGoalTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
  },

  {
    routineId: 8,
    emoji: '📝',
    color: Colors.pink,
    title: '공부하기',
    durationGoalTime: 1800,
    startGoalTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
  },
];

const MyRoutinePage = (): JSX.Element => {
  const history = useHistory();
  const onClickRoutine = (e: React.MouseEvent<HTMLElement>, id: any) => {
    e.stopPropagation();
    const element = e.target as HTMLElement;

    if (
      element.tagName === 'DIV' &&
      element?.className.includes('CompletedRoutine')
    ) {
      history.push(`/routine/${id}`);
    }
  };
  return (
    <Container navBar>
      <TabBar>
        <TabBar.Item title="전체" index="0">
          <RoutineGridBox>
            {DUMMY_ROUTINE &&
              DUMMY_ROUTINE.map((routine, i) => (
                <Routine
                  onClick={(e) => onClickRoutine(e, routine.routineId)}
                  key={routine.routineId}
                  routineObject={routine}
                  type="myRoutine"
                  completed={i > 5 ? false : true}
                />
              ))}
          </RoutineGridBox>
        </TabBar.Item>
        <TabBar.Item title="해야할 루틴" index="1">
          <RoutineGridBox>
            {DUMMY_ROUTINE &&
              DUMMY_ROUTINE.map((routine) => (
                <Routine
                  onClick={(e) => onClickRoutine(e, routine.routineId)}
                  key={routine.routineId}
                  routineObject={routine}
                  type="myRoutine"
                  completed={false}
                />
              ))}
          </RoutineGridBox>
        </TabBar.Item>
        <TabBar.Item title="완료한 루틴" index="2">
          <RoutineGridBox>
            {DUMMY_ROUTINE &&
              DUMMY_ROUTINE.map((routine) => (
                <Routine
                  onClick={(e) => onClickRoutine(e, routine.routineId)}
                  key={routine.routineId}
                  routineObject={routine}
                  type="myRoutine"
                  completed={true}
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

  @media ${Media.sm} {
    gap: 10px 14px;
    padding: 20px 0;
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
