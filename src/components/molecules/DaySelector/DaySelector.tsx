import { WEEK } from '@/constants';
import { Media } from '@/styles';
import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';
import DayItem from './DayItem';

export interface DaySelectorProps {
  name: string;
  onChange: (selectedDays: string[]) => void;
  initialSelectedDays?: string[];
}

const DaySelector = ({
  initialSelectedDays,
  onChange,
  ...props
}: DaySelectorProps): JSX.Element => {
  const days = Object.values(WEEK);
  const [selectedDays, setSelctedDays] = useState<string[]>(() => {
    return initialSelectedDays ? initialSelectedDays : [];
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDay = e.target.value;
    if (selectedDays?.includes(selectedDay)) {
      e.target.checked = false;
      const newSelectedDay = selectedDays.filter((day) => day !== selectedDay);
      setSelctedDays(newSelectedDay);
      onChange && onChange(newSelectedDay);
    } else {
      const newSelectedDay = [...selectedDays, selectedDay];
      setSelctedDays(newSelectedDay);
      onChange && onChange(newSelectedDay);
    }
  };
  return (
    <StyledDaySelector {...props}>
      {days.map((day) => (
        <DayItem
          name="weeks"
          key={day}
          onChange={handleChange}
          day={day}
          checked={selectedDays.includes(day)}
        />
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
