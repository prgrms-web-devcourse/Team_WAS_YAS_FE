import { RoutineCategory, RoutineCategoryProps } from '@/components';

export default {
  title: 'Components/Atoms/RoutineCategory',
  component: RoutineCategory,
};

export const Default = ({ ...args }: RoutineCategoryProps): JSX.Element => {
  return (
    <>
      <RoutineCategory {...args}>건강</RoutineCategory>
      <RoutineCategory {...args}>운동</RoutineCategory>
    </>
  );
};
