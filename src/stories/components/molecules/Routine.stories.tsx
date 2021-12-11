import { Routine } from '@/components';
import { Colors } from '@/styles';

export default {
  title: 'Components/Molecules/Routine',
  component: Routine,
};

const routineObject: {
  emoji: string;
  color: string;
  name: string;
  durationGoalTime: number;
  startGoalTime: string;
  routineCategory?: string[] | undefined;
  weeks?: string[] | undefined;
} = {
  emoji: '🌳',
  color: Colors.red,
  name: '집 앞 공원 산책하기',
  durationGoalTime: 12345,
  startGoalTime: `${new Date().toISOString()}`,
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
          emoji: '',
          color: Colors.red,
          name: '',
          durationGoalTime: 0,
          startGoalTime: `${new Date().toISOString()}`,
        }}
        type="create"
      />
    </>
  );
};
