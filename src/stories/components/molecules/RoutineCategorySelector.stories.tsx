import {
  RoutineCategorySelector,
  RoutineCategoryItemProps,
} from '@/components';

export default {
  title: 'Components/Molecules/RoutineCategorySelector',
  component: RoutineCategorySelector,
};

export const Default = ({ ...args }: RoutineCategoryItemProps): JSX.Element => {
  const categoryList = ['전체', '건강', '운동', '개발'];
  return (
    <RoutineCategorySelector {...args}>
      {categoryList &&
        categoryList.map((item, i) => (
          <RoutineCategorySelector.Item key={i} title={item} index={String(i)}>
            <h1>{item}</h1>
          </RoutineCategorySelector.Item>
        ))}
    </RoutineCategorySelector>
  );
};
