import {
  RoutineCategorySelector,
  RoutineCategorySelectorProps,
} from '@/components';

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
