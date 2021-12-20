import {
  Container,
  LikeBox,
  RoutineInfo,
  RoutineCategory,
  Mission,
  Comment,
  CommentCreator,
  Spinner,
  IconButton,
  SpreadToggle,
} from '@/components';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ROUTINE_CATEGORY } from '@/constants';
import { Colors, Media, FontSize } from '@/styles';
import { postApi, commentApi, likeApi } from '@/apis';
import { RoutinePostType, CommentType } from '@/Models';
import { useHistory, useParams } from 'react-router-dom';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';

const RoutinePostDetailPage = (): JSX.Element => {
  const history = useHistory();
  const { id: postId } = useParams<{ id: string }>();
  const [missionOpened, setMissionOpened] = useState<boolean>(false);
  const [postData, setPostData] = useState<RoutinePostType>();
  const [loading, setLoading] = useState<boolean>(false);
  const loginUser = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        if (!postId) return;
        const response = await postApi.getPost(parseInt(postId));
        const postData: RoutinePostType = response.data.data;
        setPostData(() => ({ ...postData }));
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
    window.location.replace(`/community/${postData.postId}`);
  };

  const handleUpdateComment = async (commentId: number, content: string) => {
    const newContent = content.trim();
    if (!newContent) return;
    await commentApi.updateComment(commentId, newContent);
  };

  const handleDeleteComment = async (commentId: number) => {
    await commentApi.deleteComment(commentId);
    if (!postData?.postId) return;
    window.location.replace(`/community/${postData.postId}`);
  };

  const handleClickPostLikeToggle = async (
    count: number,
    prevToggled: boolean,
  ) => {
    if (!loginUser) {
      Swal.fire({
        icon: 'error',
        title: '🤯',
        text: '로그인이 필요합니다.',
        confirmButtonColor: Colors.point,
      });
      return;
    }

    if (!postData) return;

    prevToggled
      ? await likeApi.deletePostLike(postData.postId)
      : await likeApi.createPostLike(postData.postId);
  };

  const handleClickCommentLikeToggle = async (
    postId: number,
    prevToggled: boolean,
  ) => {
    if (!loginUser) {
      Swal.fire({
        icon: 'error',
        title: '🤯',
        text: '로그인이 필요합니다.',
        confirmButtonColor: Colors.point,
      });
      return;
    }

    prevToggled
      ? await likeApi.deleteCommentLike(postId)
      : await likeApi.createCommentLike(postId);
  };

  const handleClickDeleteButton = () => {
    if (!postData) return;
    Swal.fire({
      title: '🤔',
      text: '정말로 업로드한 루틴 포스트를 삭제하시겠습니까?',
      confirmButtonColor: Colors.point,
      showCancelButton: true,
      cancelButtonColor: Colors.functionNegative,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await postApi.deletePost(postData.postId);
          Swal.fire({
            icon: 'success',
            title: '😉',
            text: '업로드한 루틴 포스트가 삭제되었습니다.',
            confirmButtonColor: Colors.point,
          }).then(history.push('/community'));
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: '😂',
            text: '삭제하지 못했습니다.',
            confirmButtonColor: Colors.point,
          });
        }
      }
    });
  };

  const handleClickBringRoutineButton = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `😎`,
      text: '자유롭게 수정하고 생성하기를 완료해주세요.',
      confirmButtonColor: Colors.point,
    });
    history.push({
      pathname: '/routine/create',
      state: { data: postData?.routine },
    });
  };

  return (
    <Container navBar>
      <RoutineInfoHeader>
        <AuthorInfoWrapper>
          <StyledAvatar src={postData && postData.user.profileImage} />
          <AuthorNameText>{postData && postData.user.nickname}</AuthorNameText>
        </AuthorInfoWrapper>
        <LikeBox
          interactive={loginUser ? true : false}
          active={
            loginUser
              ? postData &&
                postData.likes.some((like) => like.userId === loginUser?.userId)
              : false
          }
          onClick={handleClickPostLikeToggle}
          count={postData && postData.likes.length}
        />
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
        <ButtonContainer>
          {postData && postData.user.userId === loginUser?.userId ? (
            <IconButton.Delete onClick={handleClickDeleteButton} />
          ) : null}
          <BringRoutineButton onClick={handleClickBringRoutineButton}>
            <GetAppRoundedIcon />
            루틴 가져오기
          </BringRoutineButton>
        </ButtonContainer>
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
          postData.comments.map((comment: CommentType) => (
            <Comment
              key={comment.commentId}
              editable={
                loginUser ? comment.user.userId === loginUser.userId : undefined
              }
              onEditComment={handleUpdateComment}
              onDeleteComment={handleDeleteComment}
              onClickLikeToggle={handleClickCommentLikeToggle}
              likeToggled={comment.likes.some(
                (like) => like.userId === loginUser?.userId,
              )}
              likeCount={comment.likes.length}
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
  color: ${Colors.textPrimary};

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
  cursor: pointer;

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const StyledCommentCreator = styled(CommentCreator)`
  margin: 2rem 0 1rem 0;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  width: 100%;
`;

export default RoutinePostDetailPage;
