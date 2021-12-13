interface ConstantType {
  [index: string]: string;
}

export const ROUTINE_TAB = Object.freeze({
  TOTAL: '전체 루틴',
  TODO: '해야할 루틴',
  COMPLETE: '완료한 루틴',
});

export const ROUTINE_CATEGORY: ConstantType = Object.freeze({
  TOTAL: '전체',
  EXERCISE: '운동',
  GAME: '게임',
  FOOD: '음식',
  HOBBY: '취미',
  SHOPPING: '쇼핑',
  HEALTH: '건강',
  STUDY: '공부',
});

export const WEEK = Object.freeze({
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
});
