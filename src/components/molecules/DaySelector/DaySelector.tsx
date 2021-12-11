import { Media } from '@/styles';
import styled from '@emotion/styled';
import { ChangeEvent } from 'react';
import DayItem, { DayItemProps } from './DayItem';

const DaySelector = ({ onChange, ...props }: DayItemProps): JSX.Element => {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };
  return (
    <StyledDaySelector {...props}>
      {days.map((day) => (
        <DayItem key={day} onChange={handleChange} day={day} />
      ))}
    </StyledDaySelector>
  );
};

export default DaySelector;

const StyledDaySelector = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  place-items: center;
  @media ${Media.sm} {
    height: 32px;
  }
  @media ${Media.md} {
    height: 56px;
  }
  @media ${Media.lg} {
    height: 56px;
  }
`;
