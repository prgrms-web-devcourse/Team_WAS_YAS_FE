import { Mission } from '@/components';
import { Colors } from '@/styles';

export default {
  title: 'Components/Molecules/Mission',
  component: Mission,
  argTypes: {},
};

const missionObject: {
  emoji: string;
  name: string;
  color: string;
  durationTime: number;
} = {
  emoji: '🚿',
  name: '샤워하기',
  durationTime: 1200,
  color: Colors.red,
};

export const Default = (): JSX.Element => {
  return <Mission missionObject={missionObject} />;
};
