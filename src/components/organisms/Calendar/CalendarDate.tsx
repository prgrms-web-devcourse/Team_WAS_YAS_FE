import React from 'react';
import styled from '@emotion/styled';
import { FontSize, Colors } from '@/styles';
// import dayjs from 'dayjs';

export interface CalendarDateProps extends React.ComponentProps<'td'> {
  onClickDate?: (selectedDate: string) => void;
}

const CalendarDate = ({
  children,
  onClickDate,
  ...props
}: CalendarDateProps): JSX.Element => {
  const handleClick = () => {
    console.log();
    const date = children?.toString();
    console.log(typeof date);
    if (!date) return;
    onClickDate && onClickDate(date);
  };

  return (
    <TableData {...props}>
      <DateText disabled={!children} onClick={handleClick}>
        {children}
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
  color: ${Colors.textPrimary};

  @media (hover: hover) {
    :hover {
      background-color: ${({ disabled }) =>
        disabled ? null : Colors.pointLight};
    }
  }
`;

export default CalendarDate;
