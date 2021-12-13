import { RoutineInfo } from '@/components/molecules/RoutineInfo';
import { Fragment } from 'react';

export default {
  title: 'Components/Molecules/RoutineInfo',
  component: RoutineInfo,
};

const routineObject = {
  emoji: '💪',
  title: '한강에서 산책하기',
  durationGoalTime: 12345,
};

export const Default = (): JSX.Element => {
  return (
    <Fragment>
      <h2>createdAt prop 작성</h2>
      <RoutineInfo
        routineObject={routineObject}
        createdAt={new Date().toISOString()}
      />
      <h2>createdAt prop 미작성</h2>
      <RoutineInfo routineObject={routineObject} />
    </Fragment>
  );
};
