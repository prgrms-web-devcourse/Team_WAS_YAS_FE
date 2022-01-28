import { RoutineReview } from '@/components';

export default {
  title: 'Components/Molecules/RoutineReview',
  component: RoutineReview,
  argTypes: {
    onChange: { actions: 'onChange' },
  },
};

const DUMMY_DATA = {
  routineStatusId: 42,
  dateTime: '2021-12-24T12:23:19Z',
  emoji: '3',
  content:
    '오늘 날씨가 좋아서 즐겁게 루틴 수행했습니다!\n아침에 기분이 안좋았는데 산책으로 힐링했어요~~~',
  routineStatusImage: [
    {
      routineStatusImageId: 7,
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      routineStatusImageId: 8,
      imageUrl: 'https://picsum.photos/300/200',
    },
    {
      routineStatusImageId: 15,
      imageUrl: 'https://picsum.photos/300/300',
    },
  ],
  routineDetailResponse: {
    name: '음주',
    emoji: '😍',
    color: '#FCCC5B',
    startGoalTime: '2021-12-24T09:47:00.000Z',
    durationGoalTime: 600,
    routineCategory: ['HOBBY', 'LIFE'],
    weeks: ['SUN', 'FRI', 'SAT'],
    missionDetailResponses: [
      {
        missionId: 512,
        name: '먹고쥭자',
        durationGoalTime: 600,
        orders: 0,
        emoji: '💩',
        color: '#FCCC5B',
      },
    ],
    posted: true,
  },
};

export const Default = ({ ...args }): JSX.Element => {
  return (
    <>
      <RoutineReview reviewData={DUMMY_DATA} {...args} />
    </>
  );
};
