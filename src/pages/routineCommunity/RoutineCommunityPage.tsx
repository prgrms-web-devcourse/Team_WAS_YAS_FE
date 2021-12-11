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

const DUMMY_ROUTINE: {
  id: string;
  emoji: string;
  color: string;
  name: string;
  durationTime: number;
  startTime: string;
  categorie: string[];
}[] = [
  {
    id: '1',
    emoji: '🌳',
    color: Colors.red,
    name: '집 앞 공원 산책하기',
    durationTime: 10000,
    startTime: `${new Date().toISOString()}`,
    categorie: ['운동'],
  },
  {
    id: '2',
    emoji: '🥽',
    color: Colors.brown,
    name: '물 2L 마시기',
    durationTime: 780,
    startTime: `${new Date(2021, 12, 8, 12, 0).toISOString()}`,
    categorie: ['건강'],
  },
  {
    id: '3',
    emoji: '🍖',
    color: Colors.indigo,
    name: '아침 만들어 먹기',
    durationTime: 4200,
    startTime: `${new Date(2021, 12, 8, 6, 30).toISOString()}`,
    categorie: ['음식'],
  },
  {
    id: '4',
    emoji: '📝',
    color: Colors.pink,
    name: '공부하기',
    durationTime: 1800,
    startTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
    categorie: ['공부'],
  },
  {
    id: '5',
    emoji: '📝',
    color: Colors.pink,
    name: '공부하기',
    durationTime: 1800,
    startTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
    categorie: ['공부'],
  },
  {
    id: '6',
    emoji: '📝',
    color: Colors.pink,
    name: '공부하기',
    durationTime: 1800,
    startTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
    categorie: ['공부'],
  },
  {
    id: '7',
    emoji: '📝',
    color: Colors.pink,
    name: '공부하기',
    durationTime: 1800,
    startTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
    categorie: ['공부'],
  },

  {
    id: '8',
    emoji: '📝',
    color: Colors.pink,
    name: '공부하기',
    durationTime: 1800,
    startTime: `${new Date(2021, 12, 8, 21, 30).toISOString()}`,
    categorie: ['공부'],
  },
];

const RoutineCommunityPage = (): JSX.Element => {
  const categoryList = [
    '전체',
    '운동',
    '게임',
    '음식',
    '취미',
    '쇼핑',
    '건강',
    '공부',
  ];
  const [clickedCategory, setClickedCategory] = useState<string>('전체');
  const categoryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClickedCategory(e.target.value);
  };

  const history = useHistory();
  const onClickRoutine = (e: React.MouseEvent<HTMLElement>, id: string) => {
    const element = e.target as HTMLElement;

    if (
      !(
        element.tagName === 'svg' ||
        element.tagName === 'BUTTON' ||
        element.tagName === 'path'
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
              onChange={categoryChangeHandler}
              categories={categoryList}
            />
          </CategoryContainer>
          <RoutineGridBox>
            {DUMMY_ROUTINE?.map((routine) => {
              if (clickedCategory === '전체') {
                return (
                  <Routine
                    onClick={(e) => onClickRoutine(e, routine.id)}
                    key={routine.id}
                    routineObject={routine}
                    type="communityRoutine"
                  />
                );
              } else if (routine.categorie.includes(clickedCategory)) {
                return (
                  <Routine
                    onClick={(e) => onClickRoutine(e, routine.id)}
                    key={routine.id}
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
              onChange={categoryChangeHandler}
              categories={categoryList}
            />
          </CategoryContainer>
          <RoutineGridBox>
            {DUMMY_ROUTINE?.map((routine) => {
              if (clickedCategory === '전체') {
                return (
                  <Routine
                    onClick={(e) => onClickRoutine(e, routine.id)}
                    key={routine.id}
                    routineObject={routine}
                    type="communityRoutine"
                    like={+routine.id}
                  />
                );
              } else if (routine.categorie.includes(clickedCategory)) {
                return (
                  <Routine
                    onClick={(e) => onClickRoutine(e, routine.id)}
                    key={routine.id}
                    routineObject={routine}
                    type="communityRoutine"
                    like={+routine.id}
                  />
                );
              }
            })}
          </RoutineGridBox>
        </TabBar.Item>

        <TabBar.Item title="나의 루틴" index="2">
          <CategoryContainer>
            <StyledCategorySelector
              onChange={categoryChangeHandler}
              categories={categoryList}
            />
          </CategoryContainer>
          <RoutineGridBox>
            {DUMMY_ROUTINE?.map((routine) => {
              if (clickedCategory === '전체') {
                return (
                  <Routine
                    onClick={(e) => onClickRoutine(e, routine.id)}
                    key={routine.id}
                    routineObject={routine}
                    type="communityMyRoutine"
                  />
                );
              } else if (routine.categorie.includes(clickedCategory)) {
                return (
                  <Routine
                    onClick={(e) => onClickRoutine(e, routine.id)}
                    key={routine.id}
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
