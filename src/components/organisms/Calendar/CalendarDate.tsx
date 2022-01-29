import React from 'react';
import styled from '@emotion/styled';
import { FontSize, Colors } from '@/styles';
import dayjs from 'dayjs';

export interface CalendarDateProps extends React.ComponentProps<'td'> {
  date: dayjs.Dayjs | undefined;
  disabled?: boolean;
  selected?: boolean;
  marked?: boolean;
  highlight?: number;
  onClickDate?: (date: dayjs.Dayjs) => void;
}

const CalendarDate = ({
  date,
  disabled = false,
  selected = false,
  marked = false,
  highlight = 0,
  onClickDate,
  ...props
}: CalendarDateProps): JSX.Element => {
  const handleClick = () => {
    if (!date || disabled) return;
    onClickDate && onClickDate(date);
  };

  return (
    <TableData {...props}>
      <DateText
        disabled={disabled}
        selected={selected}
        onClick={handleClick}
        highlight={highlight}
      >
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
    highlight?: number;
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
  background-color: ${({ highlight, selected }) => {
    if (selected) return '#FFCD53';
    if (!highlight) return 'transparent';
    if (highlight <= 0) return 'transparent';
    if (highlight >= 4) return '#879BF8';
    if (highlight >= 2) return '#B1BEFC';
    if (highlight >= 1) return '#E8ECFF';
  }};

  @media (hover: hover) {
    :hover {
      background-color: ${({ disabled }) => (disabled ? null : '#FFE6A9')};
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
