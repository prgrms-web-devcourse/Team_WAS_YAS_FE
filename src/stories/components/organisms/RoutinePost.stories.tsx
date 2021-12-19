import { RoutinePost } from '@/components';
import { RoutinePostWindowType } from '@/Models';

export default {
  title: 'Components/Organisms/RoutinePost',
  component: RoutinePost,
};

const routinePostDummy: RoutinePostWindowType = {
  createdAt: '2020-06-01T00:00:00.000Z',
  likesResponse: [
    {
      userId: 123,
    },
  ],
  postId: 123,
  content: '테스트 내용',
  routine: {
    category: ['EXERCISE'],
    durationGoalTime: 500,
    startGoalTime: '2020-06-01T00:00:00.000Z',
    emoji: '🌳',
    name: '공원가서 산책하기',
    routineId: 123,
    color: '#E8587B',
    week: ['MON', 'TUE', 'SAT'],
  },
  updatedAt: '2020-06-01T00:00:00.000Z',
  user: {
    nickname: '노아',
    profileImage: '',
    userId: 123,
  },
};

export const Default = (): JSX.Element => {
  return <RoutinePost routinePost={routinePostDummy} />;
};

export {};
