// 윤년인지 확인하는 함수
export const checkLeapYear = (year: number): boolean => {
  if (year % 400 === 0) return true;
  else if (year % 100 === 0) return false;
  else if (year % 4 === 0) return true;
  else return false;
};

// 해당 연, 월의 1일이 몇요일 부터 시작하는지 계산하는 함수, 반환값은 요일의 숫자 (0~6)
export const getFirstDayOfWeek = (year: number, month: number): number => {
  const monthString = month + 1 < 10 ? `0${month + 1}` : month + 1;

  const firstDayOfWeek = new Date(year + '-' + monthString + '-01').getDay();

  return firstDayOfWeek;
};

// 일주일 단위로 배열 묶음으로 만들어서 반환하는 함수
export const divideDays = (days: number[]): number[][] => {
  const dividedDays = [];
  for (let i = 0; i < days.length; i += 7) {
    dividedDays.push(days.slice(i, i + 7));
  }
  return dividedDays;
};
