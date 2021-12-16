import {
  UserType,
  RoutineType,
  RoutinePostType,
  MissionType,
  CommentType,
} from '@/Models';

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
  missions: [],
};

export const missionDummy: MissionType = {
  missionId: 333,
  emoji: '🚿',
  name: '샤워하기',
  color: '#89C0F9',
  durationGoalTime: 3600,
  orders: 0,
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

export const commentDummy: CommentType = {
  commentId: 777,
  text: '댓글입니다.',
  userId: 123,
  createdAt: '2022-12-24T03:00:00.000Z',
  updatedAt: '2022-12-24T03:00:00.000Z',
  likes: [],
};
