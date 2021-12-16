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
    name: '나무 구경하기',
    durationGoalTime: 300,
    userDurationTime: 560,
    orders: 0,
  },
  {
    missionId: 2,
    emoji: '🥽',
    color: Colors.indigo,
    name: '수경 구경하기',
    durationGoalTime: 700,
    userDurationTime: 440,
    orders: 1,
  },
  {
    missionId: 3,
    emoji: '🍖',
    color: Colors.indigo,
    name: '고기 구워 먹기',
    durationGoalTime: 4200,
    userDurationTime: 4200,
    orders: 2,
  },
  {
    missionId: 4,
    emoji: '📝',
    color: Colors.indigo,
    name: '공부하기',
    durationGoalTime: 1800,
    userDurationTime: 2400,
    orders: 3,
  },
  {
    missionId: 5,
    emoji: '📝',
    color: Colors.indigo,
    name: '공부하기',
    durationGoalTime: 1800,
    userDurationTime: 200,
    orders: 4,
  },
  {
    missionId: 6,
    emoji: '📝',
    color: Colors.indigo,
    name: '공부하기',
    durationGoalTime: 1800,
    userDurationTime: 1,
    orders: 5,
  },
  {
    missionId: 7,
    emoji: '📝',
    color: Colors.indigo,
    name: '공부하기',
    durationGoalTime: 1800,
    userDurationTime: 1920,
    orders: 6,
  },
  {
    missionId: 8,
    emoji: '📝',
    color: Colors.indigo,
    name: '공부하기',
    durationGoalTime: 1800,
    orders: 7,
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
