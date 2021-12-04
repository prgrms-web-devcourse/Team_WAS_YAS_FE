import { CategoryButton } from '@/components';
import styled from '@emotion/styled';

export default {
  title: 'Components/Atoms/CategoryButton',
  component: CategoryButton,
};

export const Default = (): JSX.Element => {
  return (
    <CategoryButtonContainer>
      <CategoryButton>전체</CategoryButton>
      <CategoryButton>운동</CategoryButton>
      <CategoryButton>게임</CategoryButton>
      <CategoryButton>음식</CategoryButton>
      <CategoryButton>취미</CategoryButton>
      <CategoryButton>전체</CategoryButton>
      <CategoryButton>운동</CategoryButton>
      <CategoryButton>게임</CategoryButton>
      <CategoryButton>음식</CategoryButton>
      <CategoryButton>취미</CategoryButton>
    </CategoryButtonContainer>
  );
};

const CategoryButtonContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
  overflow-x: auto;
  white-space: nowrap;
  button:not(:last-of-type) {
    margin-right: 16px;
  }
`;
