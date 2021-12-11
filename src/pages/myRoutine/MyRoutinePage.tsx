import { Container, Routine, RoutineAddButton, TabBar } from '@/components';
import { Colors, Media } from '@/styles';
import styled from '@emotion/styled';
import React from 'react';
import { useHistory } from 'react-router';

const DUMMY_ROUTINE: {
  id: string;
  emoji: string;
  color: string;
  name: string;
  durationTime: number;
  startTime: string;
}[] = [
  {
    id: '1',
    emoji: '🌳',
    color: Colors.red,
    name: '집 앞 공원 산책하기',
    durationTime: 10000,
    startTime: `${new Date().toISOString()}`,
  },
  {
    id: '2',
    emoji: '🥽',
    color: Colors.brown,
    name: '물 2L 마시기',
    durationTime: 780,
    startTime: `${new Date(2021, 12, 8, 12, 0).toISOString()}`,
  },
  {
    id: '3',
    emoji: '🍖',
    color: Colors.indigo,
    name: '아침 만들어 먹기',
    durationTime: 4200,
    startTime: `${new Date(2021, 12, 8, 6, 30).toISOString()}`,
  },
  {
    id: '4',
    emoji: '📝',
    color: Colors.pink,
    name: '공부하기',
    durationTime: 1800,
    startTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
  },
  {
    id: '5',
    emoji: '📝',
    color: Colors.pink,
    name: '공부하기',
    durationTime: 1800,
    startTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
  },
  {
    id: '6',
    emoji: '📝',
    color: Colors.pink,
    name: '공부하기',
    durationTime: 1800,
    startTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
  },
  {
    id: '7',
    emoji: '📝',
    color: Colors.pink,
    name: '공부하기',
    durationTime: 1800,
    startTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
  },

  {
    id: '8',
    emoji: '📝',
    color: Colors.pink,
    name: '공부하기',
    durationTime: 1800,
    startTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
  },
];

const MyRoutinePage = (): JSX.Element => {
  const history = useHistory();
  const onClickRoutine = (e: React.MouseEvent<HTMLElement>, id: string) => {
    const element = e.target as HTMLElement;

    if (
      !(
        element.tagName === 'svg' ||
        element.tagName === 'BUTTON' ||
        element.tagName === 'path'
      )
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
              DUMMY_ROUTINE.map((routine) => (
                <Routine
                  onClick={(e) => onClickRoutine(e, routine.id)}
                  key={routine.id}
                  routineObject={routine}
                  type="myRoutine"
                  completed={+routine.id > 6 ? false : true}
                />
              ))}
          </RoutineGridBox>
        </TabBar.Item>
        <TabBar.Item title="해야할 루틴" index="1">
          <RoutineGridBox>
            {DUMMY_ROUTINE &&
              DUMMY_ROUTINE.map((routine) => (
                <Routine
                  onClick={(e) => onClickRoutine(e, routine.id)}
                  key={routine.id}
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
                  onClick={(e) => onClickRoutine(e, routine.id)}
                  key={routine.id}
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
