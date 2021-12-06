import { Colors, Media } from '@/styles';
import styled from '@emotion/styled';
import React, {
  useState,
  useMemo,
  Children,
  ReactElement,
  cloneElement,
} from 'react';
import TabItem, { TabItemProps } from './TabItem';

const TabBar = ({ children, active, ...props }: TabItemProps): JSX.Element => {
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
      <TabBarContainer {...props}>{items}</TabBarContainer>
      <div>{activeItem?.props.children}</div>
    </>
  );
};

TabBar.Item = TabItem;

export default TabBar;

const TabBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid ${Colors.backgroundMenu};
  @media ${Media.sm} {
    height: 30px;
  }
  @media ${Media.md} {
    height: 40px;
  }
  @media ${Media.lg} {
    height: 40px;
  }
`;
