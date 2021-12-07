import { Media } from '@/styles';
import styled from '@emotion/styled';
import { ChangeEvent, useCallback } from 'react';
import DayItem, { DayItemProps } from './DayItem';

const DaySelector = ({ onChange, ...props }: DayItemProps): JSX.Element => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> & { target: HTMLInputElement }) => {
      onChange && onChange(e);
    },
    [onChange],
  );
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
  @media ${Media.sm} {
    width: 284px;
    height: 32px;
  }
  @media ${Media.md} {
    width: 536px;
    height: 56px;
  }
  @media ${Media.lg} {
    width: 536px;
    height: 56px;
  }
`;
