import React from 'react';
import styled from '@emotion/styled';
import { FontSize, Colors } from '@/styles';
import dayjs from 'dayjs';

export interface CalendarDateProps extends React.ComponentProps<'td'> {
  date: dayjs.Dayjs | undefined | null;
  selected?: boolean;
  onClickDate?: (date: dayjs.Dayjs) => void;
}

const CalendarDate = ({
  date,
  selected = false,
  onClickDate,
  ...props
}: CalendarDateProps): JSX.Element => {
  const handleClick = () => {
    if (!date) return;
    onClickDate && onClickDate(date);
  };

  return (
    <TableData {...props}>
      <DateText disabled={!date} selected={selected} onClick={handleClick}>
        {date?.get('date')}
      </DateText>
    </TableData>
  );
};

const TableData = styled.td`
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
  margin: auto;
  width: 3rem;
  height: 3rem;
  cursor: ${({ disabled }) => (disabled ? null : 'pointer')};
  border-radius: 50%;
  color: ${({ selected }) =>
    selected ? Colors.textQuaternary : Colors.textPrimary};
  background-color: ${({ selected }) =>
    selected ? Colors.point : 'transparent'};

  @media (hover: hover) {
    :hover {
      background-color: ${({ disabled }) =>
        disabled ? null : Colors.pointLight};
    }
  }
`;

export default CalendarDate;
