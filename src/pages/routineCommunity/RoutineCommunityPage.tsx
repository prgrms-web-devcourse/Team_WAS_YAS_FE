import {
  Container,
  IconButton,
  RoutineCategorySelector,
  RoutinePost,
} from '@/components';
import Swal from 'sweetalert2';
import { postApi } from '@/apis';
import { Colors, Media, FontSize } from '@/styles';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { ROUTINE_CATEGORY } from '@/constants';
import { RoutinePostWindowType } from '@/Models';
import { Link, useHistory } from 'react-router-dom';

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
  const [categoryValue, setCategoryValue] = useState<string[]>(['TOTAL']);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await postApi.getPosts();
        const routinePosts = response.data.data;
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
    setCategoryValue(category);
    console.log(categoryValue);
  };

  const handleChangeTabs = (e: any, newTabValue: any) => {
    setTabValue(newTabValue);
  };

  const handleClickRoutinePosts = (postId: number) => {
    history.push(`/community/${postId}`);
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
    gap: 1rem;
    width: 100%;
  }
`;

export default RoutineCommunityPage;
