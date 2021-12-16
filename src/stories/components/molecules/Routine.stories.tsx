import { Routine } from '@/components';
import { RoutineType } from '@/Models';
import { Colors } from '@/styles';

export default {
  title: 'Components/Molecules/Routine',
  component: Routine,
};

const routineObject: Pick<
  RoutineType,
  'emoji' | 'color' | 'name' | 'durationGoalTime' | 'startGoalTime' | 'weeks'
> = {
  emoji: '🌳',
  color: Colors.red,
  name: '집 앞 공원 산책하기',
  durationGoalTime: 12345,
  weeks: ['월', '화', '수', '목', '토', '일'],
  startGoalTime: `${new Date().toISOString()}`,
};

export const Default = (): JSX.Element => {
  return (
    <>
      <h1 style={{ fontSize: 40, margin: 20 }}>마이 루틴 날짜 있을 때</h1>
      <Routine routineObject={routineObject} type="myRoutine" />
      <Routine
        routineObject={{
          ...routineObject,
          weeks: ['월', '화', '수', '목', '금', '토', '일'],
        }}
        type="myRoutine"
      />
      <Routine
        routineObject={{
          ...routineObject,
          weeks: ['월', '화', '수', '목', '금'],
        }}
        type="myRoutine"
      />
      <Routine
        routineObject={{ ...routineObject, weeks: ['토', '일'] }}
        type="myRoutine"
      />
      <h1 style={{ fontSize: 40, margin: 20 }}>그 외</h1>
      <Routine routineObject={routineObject} type="communityRoutine" />
      <Routine routineObject={routineObject} type="communityMyRoutine" />
      <Routine routineObject={routineObject} type="create" />
      <Routine
        routineObject={{
          routineId: 0,
          emoji: '',
          color: Colors.red,
          name: '',
          durationGoalTime: 0,
          startGoalTime: `${new Date().toISOString()}`,
          routineCategory: [],
          missions: [],
          weeks: [],
        }}
        type="create"
      />
    </>
  );
};
