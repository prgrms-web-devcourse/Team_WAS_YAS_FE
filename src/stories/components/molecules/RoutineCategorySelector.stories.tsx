import { RoutineCategorySelector } from '@/components';
import { RoutineCategorySelectorProps } from '@/components/molecules/RoutineCategorySelector/RoutineCategorySelector';

export default {
  title: 'Components/Molecules/RoutineCategorySelector',
  component: RoutineCategorySelector,
  argTypes: {
    onChange: { actions: 'onChange' },
  },
};

export const Default = ({
  ...args
}: RoutineCategorySelectorProps): JSX.Element => {
  return <RoutineCategorySelector {...args} />;
};
