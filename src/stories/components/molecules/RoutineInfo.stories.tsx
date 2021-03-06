import { RoutineInfo } from '@/components/molecules/RoutineInfo';
import { Fragment } from 'react';

export default {
  title: 'Components/Molecules/RoutineInfo',
  component: RoutineInfo,
};

const routineObject = {
  emoji: 'πͺ',
  title: 'νκ°μμ μ°μ±νκΈ°',
  durationGoalTime: 12345,
};

export const Default = (): JSX.Element => {
  return (
    <Fragment>
      <h2>createdAt prop μμ±</h2>
      <RoutineInfo
        routineObject={routineObject}
        createdAt={new Date().toISOString()}
      />
      <h2>createdAt prop λ―Έμμ±</h2>
      <RoutineInfo routineObject={routineObject} />
    </Fragment>
  );
};
