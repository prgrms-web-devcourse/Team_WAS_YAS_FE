import {
  Container,
  LikeBox,
  RoutineInfo,
  RoutineCategory,
  Mission,
  Comment,
  CommentCreator,
  Spinner,
  SpreadToggle,
} from '@/components';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import { ROUTINE_CATEGORY } from '@/constants';
import { Colors, Media, FontSize } from '@/styles';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { postApi, commentApi } from '@/apis';
import { RoutinePostType } from '@/Models';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const RoutinePostDetailPage = (): JSX.Element => {
  const history = useHistory();
  const { id: postId } = useParams<{ id: string }>();
  const [missionOpened, setMissionOpened] = useState<boolean>(false);
  const [postData, setPostData] = useState<RoutinePostType>();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const response = await postApi.getPost(parseInt(postId));
        setPostData(response.data);
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: '🥲 oops!',
          text: `${error}`,
          confirmButtonColor: Colors.point,
        });
      }
      setLoading(false);
    };
    getPost();
  }, [postId]);

  const handleClickMissionSpreadToggle = () => {
    setMissionOpened((missionOpened) => !missionOpened);
  };

  const handleSubmitComment = async (content: string) => {
    if (!postData?.postId) return;
    await commentApi.createComment(postData.postId, content);
    // TODO: 새로고침 방식 좀 더 깔끔한 방식이 있는지 찾아보고 변경하기
    window.location.replace(`/community/${postData.postId}`);
  };

  const handleUpdateComment = async (commentId: number, content: string) => {
    const newContent = content.trim();
    if (!newContent) return;
    await commentApi.updateComment(commentId, newContent);
    // TODO: 새로고침 방식 좀 더 깔끔한 방식이 있는지 찾아보고 변경하기
    if (!postData?.postId) return;
    window.location.replace(`/community/${postData.postId}`);
  };

  const handleDeleteComment = async (commentId: number) => {
    await commentApi.deleteComment(commentId);
    if (!postData?.postId) return;
    window.location.replace(`/community/${postData.postId}`);
  };

  return (
    <Container navBar>
      <RoutineInfoHeader>
        <AuthorInfoWrapper>
          <StyledAvatar src={postData && postData.user.profileImage} />
          <AuthorNameText>{postData && postData.user.nickname}</AuthorNameText>
        </AuthorInfoWrapper>
        <LikeBox interactive />
      </RoutineInfoHeader>
      <RoutineInfo
        createdAt={postData && postData.createdAt}
        routineObject={{
          emoji: postData && postData.routine.emoji,
          name: postData && postData.routine.name,
          durationGoalTime: postData && postData.routine.durationGoalTime,
        }}
      />
      <RoutineInfoFooter>
        <CategoryWrapper>
          {postData &&
            postData.routine.category.map((category: string) => (
              <RoutineCategory key={category}>
                {ROUTINE_CATEGORY[category]}
              </RoutineCategory>
            ))}
        </CategoryWrapper>
        <BringRoutineButton
          onClick={() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `😎`,
              text: '자유롭게 수정하고 생성하기를 완료해주세요.',
              confirmButtonColor: Colors.point,
            });
            history.push('/routine/create');
          }}
        >
          <GetAppRoundedIcon />
          루틴 가져오기
        </BringRoutineButton>
      </RoutineInfoFooter>
      <MissionContainer>
        {postData &&
          postData.routine.missions
            .slice(0, missionOpened ? undefined : 4)
            .map((mission: any) => (
              <Mission
                key={mission.missionId}
                type="create"
                missionObject={mission}
              />
            ))}
      </MissionContainer>
      {postData && postData.routine.missions.length > 4 && (
        <SpreadToggle
          open={missionOpened}
          onClick={handleClickMissionSpreadToggle}
        />
      )}
      <StyledCommentCreator onSubmit={handleSubmitComment} />
      <CommentContainer>
        {postData &&
          postData.comments.map((comment: any) => (
            <Comment
              editable={user ? comment.user.userId === user.userId : undefined}
              onEditComment={handleUpdateComment}
              onDeleteComment={handleDeleteComment}
              key={comment.commentId}
              comment={comment}
            />
          ))}
      </CommentContainer>
      {loading && <Spinner />}
    </Container>
  );
};

const RoutineInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 1rem 0;
`;

const RoutineInfoFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;

const AuthorInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 0.5rem;
`;

const AuthorNameText = styled.p`
  color: & {

  }
  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
  @media ${Media.md} {
    font-size: ${FontSize.base};
  }
  @media ${Media.lg} {
    font-size: ${FontSize.base};
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const BringRoutineButton = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${Colors.point};
  border: none;
  border-radius: 1rem;
  color: ${Colors.textQuaternary};
  font-size: ${FontSize.small};
  padding: 0 0.5rem;

  @media (hover: hover) {
    :hover {
      background-color: ${Colors.pointLight};
    }
  }

  &: active {
    background-color: ${Colors.backgroundButton};
  }

  @media ${Media.sm} {
    width: 140px;
    height: 40px;
  }
  @media ${Media.md} {
    width: 140px;
    height: 40px;
  }
  @media ${Media.lg} {
    width: 140px;
    height: 40px;
  }
`;

const MissionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  width: 100%;
`;

const StyledCommentCreator = styled(CommentCreator)`
  margin: 2rem 0 1rem; 0;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  width: 100%;
`;

export default RoutinePostDetailPage;
