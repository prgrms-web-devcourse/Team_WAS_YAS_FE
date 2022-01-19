import { RoutineReview } from '@/components';

export default {
  title: 'Components/Molecules/RoutineReview',
  component: RoutineReview,
  argTypes: {
    onChange: { actions: 'onChange' },
  },
};

export const Default = ({ ...args }): JSX.Element => {
  return (
    <>
      <RoutineReview {...args} />
    </>
  );
};
