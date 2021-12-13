import { UserType, RoutineType, RoutinePostType } from '@/Models';

export const userDummy: UserType = {
  userId: 123,
  userName: '아이엠보이',
  nickName: '아이엠보이',
  profileImageUrl: 'https://picsum.photos/200',
  email: 'yas@yas.com',
};

export const routineDummy: RoutineType = {
  routineId: 321,
  title: '집 앞 공원 산책하기',
  emoji: '🌳',
  color: '#66CE92',
  startGoalTime: '2022-12-24T03:00:00.000Z',
  durationGoalTime: 1000,
  weeks: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  routineCategories: ['HEALTH', 'EXERCISE'],
  missions: [],
};

export const routinePostDummy: RoutinePostType = {
  routinePostId: 333,
  title: '집 앞 공원 산책하기',
  userId: 123,
  routineId: 321,
  createdAt: '2022-12-24T03:00:00.000Z',
  updatedAt: '2022-12-24T03:00:00.000Z',
  comments: [],
  likes: [],
};
