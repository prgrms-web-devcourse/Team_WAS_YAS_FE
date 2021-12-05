import { CategoryButton } from '@/components';
import styled from '@emotion/styled';

export interface RoutineCategoryProps extends React.ComponentProps<'div'> {
  routineList?: string[];
}

const RoutineCategory = ({
  routineList,
  ...props
}: RoutineCategoryProps): JSX.Element => {
  return (
    <RoutineCategoryContainer {...props}>
      {routineList &&
        routineList.map((routine) => (
          <CategoryButton key={routine}>{routine}</CategoryButton>
        ))}
    </RoutineCategoryContainer>
  );
};

export default RoutineCategory;

const RoutineCategoryContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
  white-space: nowrap;
  button:not(:last-of-type) {
    margin-right: 16px;
  }
`;
