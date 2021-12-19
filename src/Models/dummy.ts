import { UserType, RoutineType, MissionType } from '@/Models';

export const userDummy: UserType = {
  userId: 123,
  name: '아이엠보이',
  nickname: '아이엠보이',
  profileImage: 'https://picsum.photos/200',
  email: 'yas@yas.com',
};

export const routineDummy: RoutineType = {
  routineId: 321,
  name: '집 앞 공원 산책하기',
  emoji: '🌳',
  color: '#66CE92',
  startGoalTime: '2022-12-24T03:00:00.000Z',
  durationGoalTime: 1000,
  weeks: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  routineCategory: ['HEALTH', 'EXERCISE'],
  missionDetailResponse: [],
};

export const missionDummy: MissionType = {
  missionId: 333,
  emoji: '🚿',
  name: '샤워하기',
  color: '#89C0F9',
  durationGoalTime: 3600,
  orders: 0,
};
