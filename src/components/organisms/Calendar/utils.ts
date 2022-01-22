import dayjs from 'dayjs';

const divideDates = (
  dates: (dayjs.Dayjs | undefined)[],
): (dayjs.Dayjs | undefined)[][] => {
  const dividedDates = [];

  for (let i = 0; i < dates.length; i += 7) {
    dividedDates.push(dates.slice(i, i + 7));
  }

  return dividedDates;
};

export const generateCalendarDates = (
  year: number,
  month: number,
): (dayjs.Dayjs | undefined)[][] => {
  const date = dayjs().set('year', year).set('month', month);
  const calendarDates: (dayjs.Dayjs | undefined)[] = [];
  const firstDayOfWeek = date.startOf('month').get('day');

  [...Array(firstDayOfWeek)].forEach((_) => {
    calendarDates.push(undefined);
  });

  [...Array(date.daysInMonth())].forEach((_, index) => {
    const date = dayjs()
      .set('year', year)
      .set('month', month)
      .set('date', index + 1);
    calendarDates.push(date);
  });

  const leftDays = 7 - (calendarDates.length % 7);

  [...Array(leftDays)].forEach((_) => {
    calendarDates.push(undefined);
  });

  return divideDates(calendarDates);
};
