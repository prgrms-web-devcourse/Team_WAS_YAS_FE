import { Routine } from '@/components';

export default {
  title: 'Components/Molecules/Routine',
  component: Routine,
};

export const Default = (): JSX.Element => {
  return <Routine.Basic />;
};
