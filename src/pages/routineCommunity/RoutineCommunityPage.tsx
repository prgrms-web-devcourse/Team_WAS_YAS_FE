import React, { useEffect, useState } from 'react';
import {
  Container,
  IconButton,
  Routine,
  RoutineCategorySelector,
  TabBar,
  RoutinePost,
} from '@/components';
import styled from '@emotion/styled';
import { Colors, Media } from '@/styles';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { RoutinePostWindowType } from '@/Models';
import { ROUTINE_CATEGORY } from '@/constants';
import { postApi } from '@/apis';
import Swal from 'sweetalert2';

// !: RoutinePost 컴포넌트 테스트용 더미
const routinePostDummy: RoutinePostWindowType = {
  createdAt: '2020-06-01T00:00:00.000Z',
  likesResponse: [
    {
      userId: 3,
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
    weeks: ['MON', 'TUE', 'SAT'],
  },
  updatedAt: '2020-06-01T00:00:00.000Z',
  user: {
    nickname: '노아',
    profileImage: '',
    userId: 123,
  },
};

// !: RoutinePost 컴포넌트 테스트용 더미
const routinePostsDummy: { data: RoutinePostWindowType[] } = {
  data: [
    routinePostDummy,
    routinePostDummy,
    routinePostDummy,
    routinePostDummy,
    routinePostDummy,
    routinePostDummy,
  ],
};

const RoutineCommunityPage = (): JSX.Element => {
  const history = useHistory();
  const [routinePosts, setRoutinePosts] = useState<
    RoutinePostWindowType[] | undefined
  >();
  const [category, setCategory] = useState<string[]>(['TOTAL']);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await postApi.getPosts();
        const routinePosts = response.data.data;
        setRoutinePosts(routinePosts);
        console.log(routinePosts);
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    };
    getPosts();
  }, []);

  const handleChangeCategory = (category: string[]) => {
    setCategory(category);
  };

  const handleClickRoutinePosts = (postId: number) => {
    history.push(`/community/${postId}`);
  };

  return (
    <Container navBar>
      <TabBar type="community">
        <TabBar.Item title="🐥 신규 루틴" index="0">
          <CategoryContainer>
            <StyledCategorySelector
              type="radio"
              selectedLimit={1}
              onChange={handleChangeCategory}
              categories={Object.keys(ROUTINE_CATEGORY)}
            />
          </CategoryContainer>
          <RoutinePostGrid>
            {routinePosts &&
              routinePosts.map((routinePost) => (
                <RoutinePost
                  key={routinePost.postId}
                  routinePost={routinePost}
                  onClickRoutinePost={handleClickRoutinePosts}
                />
              ))}
          </RoutinePostGrid>
        </TabBar.Item>

        <TabBar.Item title="🔥 인기 루틴" index="1">
          <CategoryContainer>
            <StyledCategorySelector
              type="radio"
              selectedLimit={1}
              onChange={handleChangeCategory}
              categories={Object.keys(ROUTINE_CATEGORY)}
            />
          </CategoryContainer>
          <RoutineGridBox></RoutineGridBox>
        </TabBar.Item>

        <TabBar.Item title="💫 나의 루틴" index="2">
          <CategoryContainer>
            <StyledCategorySelector
              type="radio"
              selectedLimit={1}
              onChange={handleChangeCategory}
              categories={Object.keys(ROUTINE_CATEGORY)}
            />
          </CategoryContainer>
          <RoutineGridBox></RoutineGridBox>
        </TabBar.Item>
      </TabBar>

      <Link to="/community/create">
        <StyledRoutineAddButton />
      </Link>
    </Container>
  );
};

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

// !: RoutinePost 컴포넌트를 담는 용으로 임시 추가
const RoutinePostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 260px);
  justify-content: center;
  gap: 2rem 2rem;
  padding-bottom: 24px;

  @media ${Media.sm} {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export default RoutineCommunityPage;
