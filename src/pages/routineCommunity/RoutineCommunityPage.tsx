import { useEffect, useState } from 'react';
import {
  Container,
  IconButton,
  RoutineCategorySelector,
  RoutinePost,
} from '@/components';
import styled from '@emotion/styled';
import { Media } from '@/styles';
import { Link, useHistory } from 'react-router-dom';
import { RoutinePostWindowType } from '@/Models';
import { ROUTINE_CATEGORY } from '@/constants';
import { postApi } from '@/apis';
import Swal from 'sweetalert2';
import { Tabs, Tab, Box } from '@mui/material';

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const RoutineCommunityPage = (): JSX.Element => {
  const history = useHistory();
  const [routinePosts, setRoutinePosts] = useState<
    RoutinePostWindowType[] | undefined
  >();
  const [tabValue, setTabValue] = useState(0);
  const [category, setCategory] = useState<string[]>(['TOTAL']);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await postApi.getPosts();
        const routinePosts = response.data.data;
        console.log(routinePosts);
        setRoutinePosts(routinePosts);
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

  const handleChangeTabs = (e: any, newTabValue: any) => {
    setTabValue(newTabValue);
  };

  const handleClickRoutinePosts = (postId: number) => {
    history.push(`/community/${postId}`);
  };

  return (
    <Container navBar>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs
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
        </Tabs>
      </Box>
      <CategoryContainer>
        <RoutineCategorySelector
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
      <Link to="/community/create">
        <StyledRoutineAddButton />
      </Link>
    </Container>
  );
};

const StyledTab = styled(Tab)`
  font-size: 18px;
  font-weight: bold;
  width: 200px;
`;

const CategoryContainer = styled.div`
  overflow-x: scroll;
  width: 100%;
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

const StyledRoutineAddButton = styled(IconButton.Add)`
  position: fixed;
  right: calc(50% - 266px);
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
    width: 100%;
  }
`;

export default RoutineCommunityPage;
