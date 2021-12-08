import { DayItemProps, DaySelector } from '@/components';

export default {
  title: 'Components/Molecules/DaySelector',
  component: DaySelector,
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export const Default = ({ ...args }: DayItemProps): JSX.Element => {
  return <DaySelector {...args} />;
};
