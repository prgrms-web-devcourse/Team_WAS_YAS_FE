import { RoutineCategory, RoutineCategoryProps } from '@/components';

export default {
  title: 'Components/Molecules/RoutineCategory',
  component: RoutineCategory,
};

export const Default = ({ ...args }: RoutineCategoryProps): JSX.Element => {
  return (
    <RoutineCategory routineList={['건강', '운동', '음식', '개발']} {...args} />
  );
};
