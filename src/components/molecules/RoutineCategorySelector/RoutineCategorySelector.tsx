import { RoutineCategoryItemProps } from '@/components';
import { Media } from '@/styles';
import styled from '@emotion/styled';
import { ChangeEvent } from 'react';
import RoutineCategoryItem from './RoutineCategoryItem';

export interface RoutineCategorySelectorProps extends RoutineCategoryItemProps {
  categories: string[];
}

const RoutineCategorySelector = ({
  category,
  categories,
  onChange,
  ...props
}: RoutineCategorySelectorProps): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  return (
    <RoutineCategoryContainer>
      {categories &&
        categories.map((category) => (
          <RoutineCategoryItem
            category={category}
            onChange={handleChange}
            key={category}
            {...props}
          />
        ))}
    </RoutineCategoryContainer>
  );
};

const defaultProps = {
  categories: ['전체', '운동', '건강', '개발', '기타'],
  category: '전체',
};

RoutineCategorySelector.defaultProps = defaultProps;

const RoutineCategoryContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;
  overflow-x: scroll;
  label:not(:last-of-type) {
    margin-right: 16px;
    @media ${Media.sm} {
      margin-right: 8px;
    }
  }
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default RoutineCategorySelector;
