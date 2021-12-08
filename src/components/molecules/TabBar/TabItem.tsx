import { Colors, FontSize, FontWeight, Media } from '@/styles';
import styled from '@emotion/styled';
import React from 'react';

export interface TabItemProps extends React.ComponentProps<'div'> {
  title?: string;
  index?: string;
  active?: boolean;
  currentActive?: string;
  onClick?: () => void;
}

const TabItem = ({
  title,
  active,
  onClick,
  ...props
}: TabItemProps): JSX.Element => {
  return (
    <TabItemWrapper {...props}>
      <TabItemContainer active={active} onClick={onClick} {...props}>
        {title}
      </TabItemContainer>
    </TabItemWrapper>
  );
};

const TabItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 3);
  cursor: pointer;
`;

const TabItemContainer = styled.div<TabItemProps>`
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${Colors.textSecondary};
  ${({ active }) => `color: ${active ? Colors.point : Colors.textSecondary};
  font-weight: ${active ? FontWeight.bold : ''};`}
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
    color: ${Colors.point};
    font-weight: ${FontWeight.bold};
  }
`;

export default TabItem;
