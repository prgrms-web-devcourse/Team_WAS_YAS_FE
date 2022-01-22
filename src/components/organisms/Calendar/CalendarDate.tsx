import React from 'react';
import styled from '@emotion/styled';
import { FontSize, Colors } from '@/styles';
import dayjs from 'dayjs';

export interface CalendarDateProps extends React.ComponentProps<'td'> {
  date: dayjs.Dayjs | undefined;
  disabled?: boolean;
  selected?: boolean;
  marked?: boolean;
  onClickDate?: (date: dayjs.Dayjs) => void;
}

const CalendarDate = ({
  date,
  disabled = false,
  selected = false,
  marked = false,
  onClickDate,
  ...props
}: CalendarDateProps): JSX.Element => {
  const handleClick = () => {
    if (!date || disabled) return;
    onClickDate && onClickDate(date);
  };

  return (
    <TableData {...props}>
      <DateText disabled={disabled} selected={selected} onClick={handleClick}>
        {date?.get('date')}
      </DateText>
      {marked && <Dot />}
    </TableData>
  );
};

const TableData = styled.td`
  position: relative;
  height: 2rem;
  font-size: ${FontSize.medium};
  vertical-align: middle;
`;

const DateText = styled.p<
  React.ComponentProps<'p'> & {
    disabled?: boolean;
    selected?: boolean;
  }
>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem auto;
  width: 3.2rem;
  height: 3.2rem;
  cursor: ${({ disabled }) => (disabled ? null : 'pointer')};
  border-radius: 50%;
  color: ${({ selected, disabled }) => {
    if (disabled) return 'lightgray';
    return selected ? Colors.textQuaternary : Colors.textPrimary;
  }};
  background-color: ${({ selected }) => (selected ? '#2F3A8F' : 'transparent')};

  @media (hover: hover) {
    :hover {
      background-color: ${({ disabled }) =>
        disabled ? null : Colors.pointLight};
    }
  }
`;

const Dot = styled.div`
  position: absolute;
  margin: 0 auto;
  background-color: #fe7e6d;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  bottom: 0.5rem;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default CalendarDate;
