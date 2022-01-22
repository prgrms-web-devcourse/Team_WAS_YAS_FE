import dayjs from 'dayjs';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import YearMonthPicker from './YearMonthPicker';
import { FontSize } from '@/styles';
import CalendarDate from './CalendarDate';
import { DAY_OF_WEEK } from './constants';

export interface CalendarProps extends React.ComponentProps<'div'> {
  onClickDate?: (date: dayjs.Dayjs) => void;
  markedDates?: [];
}

const Calendar = ({
  onClickDate,
  markedDates,
  ...props
}: CalendarProps): JSX.Element => {
  const [yearMonth, setYearMonth] = useState<dayjs.Dayjs>(dayjs());
  const [calendarDates, setCalendarDates] = useState<string[][]>([]);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  const handleChangeYearMonth = (date: dayjs.Dayjs) => {
    console.log(
      'handleChangeYearMonth',
      date,
      date.get('year'),
      date.get('month'),
    );
    setYearMonth(date);
    changeCalendarDates(date);
  };

  const changeCalendarDates = (date: dayjs.Dayjs) => {
    console.log('changeCalendarDates');
    const calendarDates: string[] = [];

    const firstDayOfWeek = date.startOf('month').get('day');
    console.log('firstDayOfWeek', firstDayOfWeek);

    [...Array(firstDayOfWeek)].forEach((_) => {
      calendarDates.push('');
    });

    [...Array(date.daysInMonth())].forEach((_, index) => {
      calendarDates.push(`${index + 1}`);
    });

    const leftDays = 7 - (calendarDates.length % 7);

    [...Array(leftDays)].forEach((_) => {
      calendarDates.push('');
    });

    const divideDates = (dates: string[]): string[][] => {
      const dividedDates = [];
      for (let i = 0; i < dates.length; i += 7) {
        dividedDates.push(dates.slice(i, i + 7));
      }
      return dividedDates;
    };

    console.log('changeCalendarDates', divideDates(calendarDates));
    setCalendarDates(divideDates(calendarDates));
  };

  const handleClickDate = (dateString: string) => {
    const selectedDate = dayjs(
      `${yearMonth.get('year')}-${yearMonth.get('month')}-${dateString}`,
    );
    setSelectedDate(selectedDate);
    onClickDate && onClickDate(selectedDate);
  };

  useEffect(() => {
    changeCalendarDates(selectedDate);
  }, [selectedDate]);

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
              <tr key={line}>
                {dates.map((date, index) => {
                  return (
                    <CalendarDate
                      key={date === '' ? `${line}-${index}` : date}
                      onClickDate={handleClickDate}
                    >
                      {date}
                    </CalendarDate>
                  );
                })}
              </tr>
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
