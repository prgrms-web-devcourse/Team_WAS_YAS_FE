import { RoutineAddButton } from '@/components';

export default {
  title: 'Components/Organisms/RoutineAddButton',
  component: RoutineAddButton,
};

export const Default = ({ ...args }): JSX.Element => {
  return (
    <>
      <RoutineAddButton />
    </>
  );
};
