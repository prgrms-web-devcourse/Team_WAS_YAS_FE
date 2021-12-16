import { RoutineProgressModal } from '@/components/organisms/RoutineProgressModal';
import { MissionType } from '@/Models';
import { Colors } from '@/styles';
import { useState } from 'react';

export default {
  title: 'Components/Organisms/RoutineProgressModal',
  component: RoutineProgressModal,
};

interface ExtendedMissionType extends MissionType {
  userDurationTime?: number;
}

const DUMMY_MISSION: ExtendedMissionType[] = [
  {
    missionId: 1,
    emoji: '🌳',
    color: Colors.indigo,
    title: '나무 구경하기',
    durationGoalTime: 300,
    userDurationTime: 560,
  },
  {
    missionId: 2,
    emoji: '🥽',
    color: Colors.indigo,
    title: '수경 구경하기',
    durationGoalTime: 700,
    userDurationTime: 440,
  },
  {
    missionId: 3,
    emoji: '🍖',
    color: Colors.indigo,
    title: '고기 구워 먹기',
    durationGoalTime: 4200,
    userDurationTime: 4200,
  },
  {
    missionId: 4,
    emoji: '📝',
    color: Colors.indigo,
    title: '공부하기',
    durationGoalTime: 1800,
    userDurationTime: 2400,
  },
  {
    missionId: 5,
    emoji: '📝',
    color: Colors.indigo,
    title: '공부하기',
    durationGoalTime: 1800,
    userDurationTime: 200,
  },
  {
    missionId: 6,
    emoji: '📝',
    color: Colors.indigo,
    title: '공부하기',
    durationGoalTime: 1800,
    userDurationTime: 1,
  },
  {
    missionId: 7,
    emoji: '📝',
    color: Colors.indigo,
    title: '공부하기',
    durationGoalTime: 1800,
    userDurationTime: 1920,
  },

  {
    missionId: 8,
    emoji: '📝',
    color: Colors.indigo,
    title: '공부하기',
    durationGoalTime: 1800,
  },
];

export const Default = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setVisible(true)}>Show</button>
      <RoutineProgressModal
        visible={visible}
        onClose={() => setVisible(false)}
        missionObject={DUMMY_MISSION}
      />
    </>
  );
};
