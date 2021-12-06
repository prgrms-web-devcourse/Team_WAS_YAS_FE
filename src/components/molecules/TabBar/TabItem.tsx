import { Colors, FontSize, FontWeight, Media } from '@/styles';
import styled from '@emotion/styled';
import React from 'react';

export interface TabItemProps extends React.ComponentProps<'div'> {
  title?: string;
  index?: string;
  active?: boolean;
  onClick?: () => void;
}

const TabItem = ({
  title,
  active,
  onClick,
  ...props
}: TabItemProps): JSX.Element => {
  return (
    <TabItemContainer active={active} onClick={onClick} {...props}>
      {title}
    </TabItemContainer>
  );
};

const TabItemContainer = styled.div<TabItemProps>`
  text-align: center;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${({ active }) => `color: ${active ? Colors.point : Colors.textSecondary};
  font-weight: ${active ? FontWeight.bold : ''};
  border-bottom: ${active ? `3px solid ${Colors.point}` : ''};`};
  @media ${Media.sm} {
    height: 30px;
    font-size: ${FontSize.small};
  }
  @media ${Media.md} {
    height: 40px;
    font-size: ${FontSize.medium};
  }
  @media ${Media.lg} {
    height: 40px;
    font-size: ${FontSize.medium};
  }
  :hover {
    background-color: ${Colors.pointLight};
  }
`;

export default TabItem;
