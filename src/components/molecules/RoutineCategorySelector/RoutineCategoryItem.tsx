import styled from '@emotion/styled';
import { Colors, FontWeight, FontSize, Media } from '@/styles';
import React from 'react';

export interface RoutineCategoryItemProps
  extends React.ComponentProps<'input'> {
  category: string;
}

const RoutineCategoryItem = ({
  category,
  ...props
}: RoutineCategoryItemProps): JSX.Element => {
  return (
    <>
      <StyledInput
        type="radio"
        id={category}
        name="Category"
        value={category}
        {...props}
      />
      <label htmlFor={category}>
        <StyledCategoryItem>{category}</StyledCategoryItem>
      </label>
    </>
  );
};

const StyledInput = styled.input`
  display: none;
  :checked + label > div {
    background-color: ${Colors.point};
    color: ${Colors.textQuaternary};
  }
`;

const StyledCategoryItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  height: 40px;
  border: 1px solid ${Colors.pointLight};
  cursor: pointer;
  text-align: center;
  color: ${Colors.textSecondary};
  background-color: ${Colors.backgroundButton};
  font-weight: ${FontWeight.medium};
  @media ${Media.sm} {
    min-width: 64px;
    min-height: 32px;
    font-size: ${FontSize.micro};
  }
  @media ${Media.md} {
    min-width: 100px;
    min-height: 40px;
    font-size: ${FontSize.base};
  }
  @media ${Media.lg} {
    min-width: 100px;
    min-height: 40px;
    font-size: ${FontSize.base};
  }
  :hover {
    background-color: ${Colors.point};
    color: ${Colors.textQuaternary};
  }
`;

export default RoutineCategoryItem;
