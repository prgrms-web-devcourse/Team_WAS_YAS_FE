import {
  Button,
  Container,
  IconButton,
  Mission,
  RoundedButton,
  RoutineCategory,
  RoutineInfo,
} from '@/components';
import { Colors, Media } from '@/styles';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const DUMMY_ROUTINE_DETAIL: {
  id: string;
  emoji: string;
  color: string;
  name: string;
  durationTime: number;
  startTime: string;
  category: string[];
  missions: {
    id: string;
    emoji: string;
    color: string;
    name: string;
    durationTime: number;
    userDurationTime?: number;
  }[];
} = {
  id: '1',
  emoji: '🌳',
  color: Colors.indigo,
  name: '집 앞 공원 산책하기',
  durationTime: 14200,
  startTime: `${new Date().toISOString()}`,
  category: ['운동', '공부'],
  missions: [
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
  ],
};

const RoutineDetailPage = (): JSX.Element => {
  return (
    <Container>
      <RoutineInfo routineObject={DUMMY_ROUTINE_DETAIL} />
      <CategoryEditFlexBox>
        <div>
          {DUMMY_ROUTINE_DETAIL.category?.map((category, i) => (
            <StyledCategory key={i}>{category}</StyledCategory>
          ))}
        </div>
        <RoundedButton.Edit />
      </CategoryEditFlexBox>
      {DUMMY_ROUTINE_DETAIL.missions?.map((mission) => (
        <StyledMission key={mission.id} missionObject={mission} />
      ))}
      <Link to={`/routine/${DUMMY_ROUTINE_DETAIL.id}/progress`}>
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
      <Link to={`/routine/${DUMMY_ROUTINE_DETAIL.id}/create`}>
        <StyledRoutineAddButton />
      </Link>
    </Container>
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

const StyledMission = styled(Mission)`
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
  right: calc(50% - 266px);
  bottom: 48px;
  @media ${Media.sm} {
    right: calc(50% - 140px);
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
