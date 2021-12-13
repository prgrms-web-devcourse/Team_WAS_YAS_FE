import { UserType, RoutineType } from '@/Models';

export const userDummy: UserType = {
  userId: 123,
  userName: '아이엠보이',
  nickName: '아이엠보이',
  profileImageUrl: 'https://picsum.photos/200',
  email: 'yas@yas.com',
};

export const routineDummy: RoutineType = {
  routineId: 123,
  title: '집 앞 공원 산책하기',
  emoji: '🌳',
  color: '#66CE92',
  startGoalTime: `${new Date(2021, 12, 24, 12, 0).toISOString()}`,
  durationGoalTime: 1000,
  weeks: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  routineCategories: ['HEALTH', 'EXERCISE'],
  missions: [],
};
