import styled from '@emotion/styled';
import React, { useState } from 'react';
import YearMonthPicker from './YearMonthPicker';
import { FontSize, Colors } from '@/styles';

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
            <TableData>
              <DateText>1</DateText>
            </TableData>
            <TableData>
              <DateText>2</DateText>
            </TableData>
            <TableData>
              <DateText>3</DateText>
            </TableData>
            <TableData>
              <DateText>4</DateText>
            </TableData>
            <TableData>
              <DateText>5</DateText>
            </TableData>
            <TableData>
              <DateText>6</DateText>
            </TableData>
            <TableData>
              <DateText>7</DateText>
            </TableData>
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
  font-size: ${FontSize.medium};
  font-weight: bold;
`;

const TableData = styled.td`
  height: 2rem;
  font-size: ${FontSize.medium};
  vertical-align: middle;
`;

const DateText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 2rem;
  height: 2rem;
`;

const Picker = styled(YearMonthPicker)`
  margin-bottom: 1rem;
`;

export default Calendar;
