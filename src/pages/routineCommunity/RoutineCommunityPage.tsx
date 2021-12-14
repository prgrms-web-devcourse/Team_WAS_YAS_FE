import React, { useState } from 'react';
import {
  Container,
  IconButton,
  Routine,
  RoutineCategorySelector,
  TabBar,
} from '@/components';
import styled from '@emotion/styled';
import { Colors, Media } from '@/styles';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { RoutineType } from '@/Models';
import { ROUTINE_CATEGORY } from '@/constants';

const DUMMY_ROUTINE: Partial<RoutineType>[] = [
  {
    routineId: 1,
    emoji: '🌳',
    color: Colors.red,
    title: '집 앞 공원 산책하기',
    durationGoalTime: 10000,
    startGoalTime: `${new Date().toISOString()}`,
    routineCategories: ['운동'],
  },
  {
    routineId: 2,
    emoji: '🥽',
    color: Colors.brown,
    title: '물 2L 마시기',
    durationGoalTime: 780,
    startGoalTime: `${new Date(2021, 12, 8, 12, 0).toISOString()}`,
    routineCategories: ['건강'],
  },
  {
    routineId: 3,
    emoji: '🍖',
    color: Colors.indigo,
    title: '아침 만들어 먹기',
    durationGoalTime: 4200,
    startGoalTime: `${new Date(2021, 12, 8, 6, 30).toISOString()}`,
    routineCategories: ['음식'],
  },
  {
    routineId: 4,
    emoji: '📝',
    color: Colors.pink,
    title: '공부하기',
    durationGoalTime: 1800,
    startGoalTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
    routineCategories: ['공부'],
  },
  {
    routineId: 5,
    emoji: '📝',
    color: Colors.pink,
    title: '공부하기',
    durationGoalTime: 1800,
    startGoalTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
    routineCategories: ['공부'],
  },
  {
    routineId: 6,
    emoji: '📝',
    color: Colors.pink,
    title: '공부하기',
    durationGoalTime: 1800,
    startGoalTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
    routineCategories: ['공부'],
  },
  {
    routineId: 7,
    emoji: '📝',
    color: Colors.pink,
    title: '공부하기',
    durationGoalTime: 1800,
    startGoalTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
    routineCategories: ['공부'],
  },

  {
    routineId: 8,
    emoji: '📝',
    color: Colors.pink,
    title: '공부하기',
    durationGoalTime: 1800,
    startGoalTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
    routineCategories: ['공부'],
  },
];

const RoutineCommunityPage = (): JSX.Element => {
  const categoryList = Object.values(ROUTINE_CATEGORY);
  const [clickedCategory, setClickedCategory] = useState<string>('전체');
  const categoryChangeHandler = (category: string[]) => {
    setClickedCategory(category[0]);
  };

  const history = useHistory();
  const onClickRoutine = (e: React.MouseEvent<HTMLElement>, id: any) => {
    e.stopPropagation();
    const element = e.target as HTMLElement;

    if (
      !(
        element.tagName === 'svg' ||
        element.tagName === 'path' ||
        element?.className.includes('ToolBox')
      )
    ) {
      history.push(`/community/${id}`);
    }
  };
  return (
    <Container navBar>
      <TabBar>
        <TabBar.Item title="신규 루틴" index="0">
          <CategoryContainer>
            <StyledCategorySelector
              type="radio"
              selectedLimit={1}
              onChange={categoryChangeHandler}
              categories={categoryList}
            />
          </CategoryContainer>
          <RoutineGridBox>
            {DUMMY_ROUTINE?.map((routine) => {
              if (clickedCategory === '전체') {
                return (
                  <Routine
                    onClick={(e) => onClickRoutine(e, routine.routineId)}
                    key={routine.routineId}
                    routineObject={routine}
                    type="communityRoutine"
                  />
                );
              } else if (routine.routineCategories?.includes(clickedCategory)) {
                return (
                  <Routine
                    onClick={(e) => onClickRoutine(e, routine.routineId)}
                    key={routine.routineId}
                    routineObject={routine}
                    type="communityRoutine"
                  />
                );
              }
            })}
          </RoutineGridBox>
        </TabBar.Item>

        <TabBar.Item title="인기 루틴" index="1">
          <CategoryContainer>
            <StyledCategorySelector
              type="radio"
              selectedLimit={1}
              onChange={categoryChangeHandler}
              categories={categoryList}
            />
          </CategoryContainer>
          <RoutineGridBox>
            {DUMMY_ROUTINE?.map((routine) => {
              if (clickedCategory === '전체') {
                return (
                  <Routine
                    onClick={(e) => onClickRoutine(e, routine.routineId)}
                    key={routine.routineId}
                    routineObject={routine}
                    type="communityRoutine"
                    like={routine.routineId}
                  />
                );
              } else if (routine.routineCategories?.includes(clickedCategory)) {
                return (
                  <Routine
                    onClick={(e) => onClickRoutine(e, routine.routineId)}
                    key={routine.routineId}
                    routineObject={routine}
                    type="communityRoutine"
                    like={routine.routineId}
                  />
                );
              }
            })}
          </RoutineGridBox>
        </TabBar.Item>

        <TabBar.Item title="나의 루틴" index="2">
          <CategoryContainer>
            <StyledCategorySelector
              type="radio"
              selectedLimit={1}
              onChange={categoryChangeHandler}
              categories={categoryList}
            />
          </CategoryContainer>
          <RoutineGridBox>
            {DUMMY_ROUTINE?.map((routine) => {
              if (clickedCategory === '전체') {
                return (
                  <Routine
                    onClick={(e) => onClickRoutine(e, routine.routineId)}
                    key={routine.routineId}
                    routineObject={routine}
                    type="communityMyRoutine"
                  />
                );
              } else if (routine.routineCategories?.includes(clickedCategory)) {
                return (
                  <Routine
                    onClick={(e) => onClickRoutine(e, routine.routineId)}
                    key={routine.routineId}
                    routineObject={routine}
                    type="communityMyRoutine"
                  />
                );
              }
            })}
          </RoutineGridBox>
        </TabBar.Item>
      </TabBar>

      <Link to="/community/create">
        <StyledRoutineAddButton />
      </Link>
    </Container>
  );
};

export default RoutineCommunityPage;

const CategoryContainer = styled.div`
  overflow-x: scroll;
  width: 688px;
  margin: 1.5rem 0;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media ${Media.sm} {
    margin: 0.5rem 0;
    max-width: 320px;
    padding: 0 0.75rem;
  }
`;

const StyledCategorySelector = styled(RoutineCategorySelector)`
  @media ${Media.sm} {
    margin: 0.75rem 0;
    max-width: 320px;
    padding: 0 0.75rem;

    div:not(:last-of-type) {
      margin-right: 8px;
    }
    div {
      height: 20px;
    }
  }
  @media ${Media.md} {
    max-width: 688px;
  }
`;

const RoutineGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 240px);
  justify-content: center;
  gap: 32px 56px;
  padding-bottom: 24px;

  @media ${Media.sm} {
    grid-template-columns: repeat(2, 140px);
    gap: 10px 14px;
    padding-bottom: 12px;
  }
`;

const StyledRoutineAddButton = styled(IconButton.Add)`
  position: fixed;
  right: calc(50% - 266px);
  bottom: 116px;

  @media ${Media.sm} {
    right: calc(50% - 140px);
    bottom: 62px;
  }
`;
