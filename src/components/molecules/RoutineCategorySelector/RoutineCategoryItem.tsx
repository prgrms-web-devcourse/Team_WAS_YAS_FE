import styled from '@emotion/styled';
import { Colors, FontWeight, FontSize, Media } from '@/styles';
import React from 'react';

export interface RoutineCategoryItemProps extends React.ComponentProps<'div'> {
  title?: string;
  index?: string;
  active?: boolean;
  onClick?: () => void;
}

const RoutineCategoryItem = ({
  title,
  index,
  active,
  onClick,
  ...props
}: RoutineCategoryItemProps): JSX.Element => {
  return (
    <StyledCategoryItem active={active} onClick={onClick} {...props}>
      {title}
    </StyledCategoryItem>
  );
};

const StyledCategoryItem = styled.div<RoutineCategoryItemProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  height: 40px;
  border: 1px solid ${Colors.pointLight};
  cursor: pointer;
  text-align: center;
  font-weight: ${FontWeight.medium};
  ${({ active }) => `background-color: ${
    active ? Colors.point : Colors.backgroundButton
  };
  color: ${active ? Colors.textQuaternary : Colors.textSecondary};`}
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
