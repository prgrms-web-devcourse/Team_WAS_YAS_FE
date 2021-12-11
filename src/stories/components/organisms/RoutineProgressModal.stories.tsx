import { RoutineProgressModal } from '@/components/organisms/RoutineProgressModal';
import { Colors } from '@/styles';
import { useState } from 'react';

export default {
  title: 'Components/Organisms/RoutineProgressModal',
  component: RoutineProgressModal,
};

const DUMMY_MISSION: {
  id: string;
  emoji: string;
  color: string;
  name: string;
  durationTime: number;
  userDurationTime?: number;
}[] = [
  {
    id: '1',
    emoji: '🌳',
    color: Colors.indigo,
    name: '나무 구경하기',
    durationTime: 300,
    userDurationTime: 560,
  },
  {
    id: '2',
    emoji: '🥽',
    color: Colors.indigo,
    name: '수경 구경하기',
    durationTime: 700,
    userDurationTime: 440,
  },
  {
    id: '3',
    emoji: '🍖',
    color: Colors.indigo,
    name: '고기 구워 먹기',
    durationTime: 4200,
    userDurationTime: 4200,
  },
  {
    id: '4',
    emoji: '📝',
    color: Colors.indigo,
    name: '공부하기',
    durationTime: 1800,
    userDurationTime: 2400,
  },
  {
    id: '5',
    emoji: '📝',
    color: Colors.indigo,
    name: '공부하기',
    durationTime: 1800,
    userDurationTime: 200,
  },
  {
    id: '6',
    emoji: '📝',
    color: Colors.indigo,
    name: '공부하기',
    durationTime: 1800,
    userDurationTime: 1,
  },
  {
    id: '7',
    emoji: '📝',
    color: Colors.indigo,
    name: '공부하기',
    durationTime: 1800,
    userDurationTime: 1920,
  },

  {
    id: '8',
    emoji: '📝',
    color: Colors.indigo,
    name: '공부하기',
    durationTime: 1800,
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
