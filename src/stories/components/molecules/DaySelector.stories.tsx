import { DaySelector, DaySelectorProps } from '@/components';

export default {
  title: 'Components/Molecules/DaySelector',
  component: DaySelector,
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export const Default = ({ ...args }: DaySelectorProps): JSX.Element => {
  return <DaySelector {...args} />;
};
