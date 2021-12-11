import { Media } from '@/styles';
import styled from '@emotion/styled';
import { ChangeEvent, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import RoutineCategoryItem, {
  RoutineCategoryItemProps,
} from './RoutineCategoryItem';

export interface RoutineCategorySelectorProps {
  selectedLimit: number;
  categories: string[];
  category: Pick<RoutineCategoryItemProps, 'category'>;
  name: string;
  type: 'radio' | 'checkbox';
  onChange: (selectedCategories: string[]) => void;
}

const RoutineCategorySelector = ({
  selectedLimit,
  categories,
  category,
  type,
  onChange,
  ...props
}: RoutineCategorySelectorProps): JSX.Element => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedCategory = e.target.value;
    switch (type) {
      case 'checkbox': {
        if (selectedCategories.includes(selectedCategory)) {
          e.target.checked = false;
          const newSelectedCategories = selectedCategories.filter(
            (item) => item !== selectedCategory,
          );
          setSelectedCategories(newSelectedCategories);
          onChange && onChange(newSelectedCategories);
        } else {
          const newSelectedCategories = [
            ...selectedCategories,
            selectedCategory,
          ];
          if (newSelectedCategories.length > selectedLimit) {
            Swal.fire({
              icon: 'warning',
              title: '카테고리는 <p>최대 2개까지만 선택이 가능합니다',
            });
            return;
          }
          setSelectedCategories(newSelectedCategories);
          onChange && onChange(newSelectedCategories);
        }
        break;
      }
      case 'radio': {
        setSelectedCategories([selectedCategory]);
        onChange && onChange([selectedCategory]);
      }
    }
  };

  return (
    <RoutineCategoryContainer {...props}>
      {categories &&
        categories.map((category) => (
          <RoutineCategoryItem
            category={category}
            type={type}
            onChange={handleChange}
            key={category}
            checked={selectedCategories.includes(category)}
            {...props}
          />
        ))}
    </RoutineCategoryContainer>
  );
};

const defaultProps = {
  selectedLimit: 2,
  categories: ['전체', '운동', '건강', '개발', '기타'],
  category: '전체',
};

RoutineCategorySelector.defaultProps = defaultProps;

const RoutineCategoryContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;
  overflow-x: scroll;
  label {
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
