import { CategoryButton, CategoryButtonProps } from '@/components';
import styled from '@emotion/styled';

export default {
  title: 'Components/Atoms/CategoryButton',
  component: CategoryButton,
};

export const Default = ({ ...args }: CategoryButtonProps): JSX.Element => {
  return (
    <CategoryButtonContainer>
      <CategoryButton {...args}>전체</CategoryButton>
      <CategoryButton {...args}>운동</CategoryButton>
      <CategoryButton {...args}>게임</CategoryButton>
      <CategoryButton {...args}>음식</CategoryButton>
      <CategoryButton {...args}>취미</CategoryButton>
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
