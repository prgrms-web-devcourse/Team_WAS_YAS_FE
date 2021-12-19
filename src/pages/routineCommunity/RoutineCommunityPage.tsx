import {
  Container,
  IconButton,
  RoutineCategorySelector,
  RoutinePost,
  LoginGuide,
  Spinner,
} from '@/components';
import Swal from 'sweetalert2';
import { postApi, likeApi } from '@/apis';
import { Colors, Media, FontSize } from '@/styles';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { ROUTINE_CATEGORY } from '@/constants';
import { RoutinePostWindowType } from '@/Models';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const a11yProps = (index: any) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
};

type ObjType = {
  [index: number]: string;
};

const TAB_VALUE: ObjType = {
  0: 'new',
  1: 'popular',
  2: 'my',
};

type OperationType = {
  [index: string]: () => ReturnType<typeof postApi.getPosts>;
};

const RoutineCommunityPage = (): JSX.Element => {
  const history = useHistory();
  const { data: user } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [routinePosts, setRoutinePosts] = useState<
    RoutinePostWindowType[] | undefined
  >();
  const [tabValue, setTabValue] = useState<number>(0);
  const [categoryValue, setCategoryValue] = useState<string>('TOTAL');

  const getPosts = useCallback(async () => {
    setLoading(true);

    const Operation: OperationType = {
      new: () => postApi.getPosts(),
      popular: () => postApi.getPostsByPopular(),
      my: () => postApi.getMyPosts(),
    };

    try {
      if (tabValue === 2 && !user) {
        setLoading(false);
        return;
      }
      const response = await Operation[TAB_VALUE[tabValue]]();
      const routinePosts: RoutinePostWindowType[] = response.data.data;
      if (categoryValue === 'TOTAL') {
        setRoutinePosts(routinePosts);
      } else {
        const filteredRoutinePosts = routinePosts.filter((routinePost) => {
          if (!routinePost.routine.category.includes(categoryValue)) return;
          return routinePost;
        });
        setRoutinePosts(filteredRoutinePosts);
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }

    setLoading(false);
  }, [tabValue, categoryValue, user]);

  useEffect(() => {
    getPosts();
  }, [tabValue, getPosts]);

  const handleChangeTabs = (e: any, newTabValue: any) => {
    setTabValue(newTabValue);
  };

  const handleChangeCategory = (categoryValue: string[]) => {
    const newCategoryValue = categoryValue[0];
    setCategoryValue(newCategoryValue);
  };

  const handleClickRoutinePosts = (postId: number) => {
    history.push(`/community/${postId}`);
  };

  const handleClickLikeToggle = async (
    postId: number,
    prevToggled: boolean,
  ) => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: '🤯',
        text: '로그인이 필요합니다.',
        confirmButtonColor: Colors.point,
      });
      return;
    }

    prevToggled
      ? await likeApi.deletePostLike(postId)
      : await likeApi.createPostLike(postId);
  };

  return (
    <Container navBar>
      <StyledTabs
        value={tabValue}
        onChange={handleChangeTabs}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <StyledTab label="🐥 신규 루틴" {...a11yProps(0)} />
        <StyledTab label="🔥 인기 루틴" {...a11yProps(1)} />
        <StyledTab label="⭐️ 나의 루틴" {...a11yProps(2)} />
      </StyledTabs>
      <CategoryContainer>
        <RoutineCategorySelector
          type="radio"
          selectedLimit={1}
          onChange={handleChangeCategory}
          categories={Object.keys(ROUTINE_CATEGORY)}
        />
      </CategoryContainer>
      {!user && tabValue === 2 ? (
        <LoginGuide />
      ) : (
        <RoutinePostGrid>
          {routinePosts &&
            routinePosts.map((routinePost) => (
              <RoutinePost
                key={routinePost.postId}
                routinePost={routinePost}
                onClickRoutinePost={handleClickRoutinePosts}
                onClickLikeToggle={handleClickLikeToggle}
              />
            ))}
        </RoutinePostGrid>
      )}

      <Link to="/community/create">
        <StyledRoutineAddButton />
      </Link>
      {loading && <Spinner />}
    </Container>
  );
};

const StyledTabs = styled(Tabs)`
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 2px solid ${Colors.backgroundMenu};
`;

const StyledTab = styled(Tab)`
  font-weight: bold;
  width: calc(100% / 3);

  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
  @media ${Media.md} {
    font-size: ${FontSize.medium};
  }
  @media ${Media.lg} {
    font-size: ${FontSize.medium};
  }
`;

const CategoryContainer = styled.div`
  overflow-x: scroll;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${Media.sm} {
    margin: 1rem 0;
  }
  @media ${Media.md} {
    margin: 1.5rem 0;
  }
  @media ${Media.lg} {
    margin: 1.5rem 0;
  }
`;

const StyledRoutineAddButton = styled(IconButton.Add)`
  position: fixed;
  right: calc(50% - 280px);
  bottom: 116px;

  @media ${Media.sm} {
    right: 1rem;
    bottom: 62px;
  }
`;

const RoutinePostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 260px);
  justify-content: center;
  gap: 2rem 2rem;
  padding-bottom: 24px;

  @media ${Media.sm} {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
`;

export default RoutineCommunityPage;
