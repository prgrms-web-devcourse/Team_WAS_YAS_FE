import {
  Button,
  Container,
  DraggableMission,
  IconButton,
  RoundedButton,
  RoutineCategory,
  RoutineInfo,
} from '@/components';
import { RoutineType, MissionType } from '@/Models';
import { Colors, Media } from '@/styles';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface ExtendedMissionType extends MissionType {
  userDurationTime?: number;
}

interface ExtendedRoutineType extends RoutineType {
  missions: ExtendedMissionType[];
}

const DUMMY_ROUTINE_DETAIL: Partial<ExtendedRoutineType> = {
  routineId: 1,
  emoji: '🌳',
  color: Colors.indigo,
  title: '집 앞 공원 산책하기',
  durationGoalTime: 14200,
  startGoalTime: `${new Date().toISOString()}`,
  routineCategories: ['운동', '공부'],
};

const RoutineDetailPage = (): JSX.Element => {
  const [missions, setMissions] = useState([
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
  ]);
  const moveMission = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragMission = missions[dragIndex];
      setMissions(
        update(missions, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragMission],
          ],
        }),
      );
    },
    [missions],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <RoutineInfo routineObject={DUMMY_ROUTINE_DETAIL} />
        <CategoryEditFlexBox>
          <div>
            {DUMMY_ROUTINE_DETAIL.routineCategories?.map((category, i) => (
              <StyledCategory key={i}>{category}</StyledCategory>
            ))}
          </div>
          <RoundedButton.Edit />
        </CategoryEditFlexBox>
        {missions.map((mission, index) => (
          <StyledMission
            moveMission={moveMission}
            index={index}
            type="normal"
            key={mission.missionId}
            missionObject={mission}
          />
        ))}
        <Link to={`/routine/${DUMMY_ROUTINE_DETAIL.routineId}/progress`}>
          <StyledButton colorType="white">
            <Svg
              viewBox="0 0 24 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.7869 15.5913L3.69882 26.6667C2.0789 27.6057 0 26.4687 0 24.5758V2.42492C0 0.535018 2.0759 -0.604927 3.69882 0.337027L22.7869 11.4125C23.1554 11.6228 23.4617 11.9269 23.6747 12.2939C23.8878 12.6608 24 13.0776 24 13.5019C24 13.9262 23.8878 14.343 23.6747 14.7099C23.4617 15.0768 23.1554 15.3809 22.7869 15.5913Z"
                fill="#565656"
              />
            </Svg>
          </StyledButton>
        </Link>
        <Link to={`/routine/${DUMMY_ROUTINE_DETAIL.routineId}/create`}>
          <StyledRoutineAddButton />
        </Link>
      </Container>
    </DndProvider>
  );
};

export default RoutineDetailPage;

const CategoryEditFlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  @media ${Media.sm} {
    margin: 1rem 0;
  }
`;

const StyledCategory = styled(RoutineCategory)`
  margin-right: 1rem;

  @media ${Media.sm} {
    margin-right: 8px;
    height: 20px;
  }
`;

const StyledMission = styled(DraggableMission)`
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  width: 200px;
  position: fixed;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);

  @media ${Media.sm} {
    width: 120px;
    bottom: 24px;
  }
`;

const StyledRoutineAddButton = styled(IconButton.Add)`
  position: fixed;
  right: calc(50% - 340px);
  bottom: 48px;
  @media ${Media.sm} {
    right: 24px;
    bottom: 24px;
  }
`;

const Svg = styled.svg`
  height: auto;
  @media ${Media.sm} {
    width: 18px;
  }
  @media ${Media.md} {
    width: 24px;
  }
  @media ${Media.lg} {
    width: 24px;
  }
`;
