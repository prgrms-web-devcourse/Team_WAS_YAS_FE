import styled from '@emotion/styled';
import React, { useState } from 'react';
import YearMonthPicker from './YearMonthPicker';

export interface CalendarProps extends React.ComponentProps<'div'> {
  onClickDate?: () => void;
  markedDates?: [];
}

const Calendar = ({
  onClickDate,
  markedDates,
  ...props
}: CalendarProps): JSX.Element => {
  const [yearMonth, setYearMonth] = useState();
  const [selectedDate, setSelectedDate] = useState();

  return (
    <Container {...props}>
      <Picker />
      <Table>
        <TableHeader>
          <TableRow>
            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
              <TableHead key={index}>{day}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableData>1</TableData>
            <TableData>2</TableData>
            <TableData>3</TableData>
            <TableData>4</TableData>
            <TableData>5</TableData>
            <TableData>6</TableData>
            <TableData>7</TableData>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  margin: auto;
`;

const TableHeader = styled.thead`
  /* margin: 1rem 0; */ // 적용이 안됨 왜지?
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr``;

const TableHead = styled.th`
  height: 2rem;
`;

const TableData = styled.td`
  text-align: center;
  height: 2rem;
`;

const Picker = styled(YearMonthPicker)`
  margin-bottom: 1rem;
`;

export default Calendar;
