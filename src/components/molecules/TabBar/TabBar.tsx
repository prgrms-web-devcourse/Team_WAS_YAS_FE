import { Colors, Media, FontSize } from '@/styles';
import styled from '@emotion/styled';
import React, {
  useState,
  useMemo,
  Children,
  ReactElement,
  cloneElement,
} from 'react';
import TabItem, { TabItemProps } from './TabItem';

const TabBar = ({
  children,
  active,
  currentActive,
  ...props
}: TabItemProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (active) {
      return active;
    } else {
      const initialIndex = Children.toArray(children)[0] as ReactElement;
      return initialIndex.props.index;
    }
  });
  const items = useMemo(() => {
    return Children.map(children, (child) => {
      const item = child as ReactElement;
      return cloneElement(item, {
        ...item.props,
        active: item.props.index === activeTab,
        onClick: () => {
          setActiveTab(item.props.index);
        },
      });
    });
  }, [children, activeTab]);
  const activeItem = useMemo(
    () => items?.find((element) => activeTab === element.props.index),
    [activeTab, items],
  );
  return (
    <>
      <TabBarContainer>
        {items}
        <TabItemPointer currentActive={activeTab} />
      </TabBarContainer>
      <div>{activeItem?.props.children}</div>
    </>
  );
};

TabBar.Item = TabItem;

export default TabBar;

const TabBarContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 3px solid ${Colors.backgroundMenu};
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
`;

const TabItemPointer = styled.div<TabItemProps>`
  width: calc(100% / 3);
  position: absolute;
  transform: ${({ currentActive }) =>
    currentActive && `translate(${parseInt(currentActive) * 100}%, 0)`};
  border-bottom: 3px solid ${Colors.point};
  transition: 0.2s ease-in-out;
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
`;
