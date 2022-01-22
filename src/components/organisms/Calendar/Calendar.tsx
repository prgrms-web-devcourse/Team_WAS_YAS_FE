import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import styled from '@emotion/styled';
import React, { useState, useEffect, useMemo } from 'react';
import YearMonthPicker from './YearMonthPicker';
import { FontSize } from '@/styles';
import CalendarDate from './CalendarDate';
import { DAY_OF_WEEK, MIN_DATE } from './constants';
import { generateCalendarDates } from './utils';

dayjs.extend(isBetween);

export interface CalendarProps extends React.ComponentProps<'div'> {
  onClickDate?: (date: dayjs.Dayjs) => void;
  markedDates?: dayjs.Dayjs[];
}

const Calendar = ({
  onClickDate,
  markedDates: rawMarkedDates = [],
  ...props
}: CalendarProps): JSX.Element => {
  const [calendarDates, setCalendarDates] = useState<
    (dayjs.Dayjs | undefined)[][]
  >([]);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const markedDates: string[] = useMemo(() => {
    return rawMarkedDates.map((date) => date.format('YYYY-MM-DD'));
  }, [rawMarkedDates]);

  const handleChangeYearMonth = (yearMonth: dayjs.Dayjs) => {
    const newCalendarDates = generateCalendarDates(
      yearMonth.get('year'),
      yearMonth.get('month'),
    );
    setCalendarDates(newCalendarDates);
  };

  const handleClickDate = (date: dayjs.Dayjs) => {
    if (date.isSame(selectedDate, 'day')) return;
    setSelectedDate(date);
    onClickDate && onClickDate(date);
  };

  useEffect(() => {
    const now = dayjs();
    const newCalendarDates = generateCalendarDates(
      now.get('year'),
      now.get('month'),
    );

    setCalendarDates(newCalendarDates);
  }, []);

  return (
    <Container {...props}>
      <Picker
        initialYearMonth={selectedDate}
        onChangeYearMonth={handleChangeYearMonth}
      />
      <Table>
        <TableHeader>
          <TableRow>
            {DAY_OF_WEEK.map((day, index) => (
              <TableHead key={index}>{day}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {calendarDates.map((dates, line) => {
            return (
              <TableRow key={line}>
                {dates.map((date, index) => {
                  return (
                    <CalendarDate
                      key={date ? date.get('date') : `${line}-${index}`}
                      date={date}
                      disabled={
                        date
                          ? !date.isBetween(
                              dayjs(MIN_DATE),
                              dayjs(),
                              'day',
                              '[]',
                            )
                          : true
                      }
                      selected={date && date.isSame(selectedDate, 'day')}
                      marked={
                        markedDates &&
                        date &&
                        markedDates.includes(date.format('YYYY-MM-DD'))
                      }
                      onClickDate={handleClickDate}
                    />
                  );
                })}
              </TableRow>
            );
          })}
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

const Picker = styled(YearMonthPicker)`
  margin-bottom: 2rem;
`;

export default Calendar;
