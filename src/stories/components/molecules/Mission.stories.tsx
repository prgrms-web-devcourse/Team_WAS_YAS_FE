import { Mission } from '@/components';
import { MissionType } from '@/Models';
import { Colors } from '@/styles';

export default {
  title: 'Components/Molecules/Mission',
  component: Mission,
};

const missionObject: Partial<MissionType> = {
  emoji: '🚿',
  title: '샤워하기',
  durationGoalTime: 1200,
  color: Colors.red,
};

export const Default = (): JSX.Element => {
  return <Mission missionObject={missionObject} />;
};
