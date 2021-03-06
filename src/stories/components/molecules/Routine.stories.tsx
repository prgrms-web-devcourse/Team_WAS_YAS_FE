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
  emoji: '๐ณ',
  color: Colors.red,
  name: '์ง ์ ๊ณต์ ์ฐ์ฑํ๊ธฐ',
  durationGoalTime: 12345,
  weeks: ['MON', 'TUE', 'WED', 'THU', 'SAT', 'SUN'],
  startGoalTime: `${new Date().toISOString()}`,
};

export const Default = (): JSX.Element => {
  return (
    <>
      <h1 style={{ fontSize: 40, margin: 20 }}>๋ง์ด ๋ฃจํด ๋ ์ง ์์ ๋</h1>
      <Routine routineObject={routineObject} type="myRoutine" />
      <Routine
        routineObject={{
          ...routineObject,
          weeks: ['TUE', 'THU', 'MON', 'FRI', 'SAT', 'SUN', 'WED'],
        }}
        type="myRoutine"
      />
      <Routine
        routineObject={{
          ...routineObject,
          weeks: ['TUE', 'WED', 'THU', 'FRI', 'MON'],
        }}
        type="myRoutine"
      />
      <Routine
        routineObject={{ ...routineObject, weeks: ['SUN', 'SAT'] }}
        type="myRoutine"
      />
      <h1 style={{ fontSize: 40, margin: 20 }}>๊ทธ ์ธ</h1>
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
          missionDetailResponses: [],
          weeks: [],
        }}
        type="create"
      />
    </>
  );
};
