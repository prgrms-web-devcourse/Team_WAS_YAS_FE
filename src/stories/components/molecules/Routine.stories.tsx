import { Routine } from '@/components';
import { RoutineType } from '@/Models';
import { Colors } from '@/styles';

export default {
  title: 'Components/Molecules/Routine',
  component: Routine,
};

const routineObject: RoutineType = {
  routineId: 0,
  emoji: '🌳',
  color: Colors.red,
  title: '집 앞 공원 산책하기',
  durationGoalTime: 12345,
  startGoalTime: `${new Date().toISOString()}`,
  routineCategories: [],
  missions: [],
  weeks: [],
};

export const Default = (): JSX.Element => {
  return (
    <>
      <Routine routineObject={routineObject} type="myRoutine" />
      <Routine routineObject={routineObject} type="communityRoutine" />
      <Routine routineObject={routineObject} type="communityMyRoutine" />
      <Routine routineObject={routineObject} type="create" />
      <Routine
        routineObject={{
          routineId: 0,
          emoji: '',
          color: Colors.red,
          title: '',
          durationGoalTime: 0,
          startGoalTime: `${new Date().toISOString()}`,
          routineCategories: [],
          missions: [],
          weeks: [],
        }}
        type="create"
      />
    </>
  );
};
