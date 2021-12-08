import styled from '@emotion/styled';
import React, {
  useState,
  useMemo,
  Children,
  ReactElement,
  cloneElement,
} from 'react';
import RoutineCategoryItem, {
  RoutineCategoryItemProps,
} from './RoutineCategoryItem';

const RoutineCategorySelector = ({
  children,
  active,
  ...props
}: RoutineCategoryItemProps): JSX.Element => {
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
      <RoutineCategoryContainer {...props}>{items}</RoutineCategoryContainer>
      <div>{activeItem?.props.children}</div>
    </>
  );
};

RoutineCategorySelector.Item = RoutineCategoryItem;

const RoutineCategoryContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;
  overflow-x: scroll;
  div:not(:last-of-type) {
    margin-right: 16px;
  }
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default RoutineCategorySelector;
