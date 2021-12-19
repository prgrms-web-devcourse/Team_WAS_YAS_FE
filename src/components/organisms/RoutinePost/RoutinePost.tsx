import React from 'react';
import { Routine, LikeBox } from '@/components';
import { RoutinePostWindowType, RoutineType } from '@/Models';
import styled from '@emotion/styled';
import { Colors, Media, FontSize } from '@/styles';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import TimeUtils from '@/utils/time';

export interface RoutinePostProps
  extends Omit<React.ComponentProps<'div'>, 'onClick'> {
  routinePost: RoutinePostWindowType;
  onClickRoutinePost?: (postId: number) => void;
  onClickLikeToggle?: (postId: number) => void;
}

const RoutinePost = ({
  routinePost: {
    postId,
    content,
    user,
    routine,
    likesResponse: likes,
    createdAt,
    updatedAt,
  },
  onClickRoutinePost,
  onClickLikeToggle,
  ...props
}: RoutinePostProps): JSX.Element => {
  const { data: loginUser } = useSelector((state: RootState) => state.user);
  const routineObject: Pick<
    RoutineType,
    'emoji' | 'color' | 'name' | 'durationGoalTime' | 'startGoalTime' | 'weeks'
  > = {
    emoji: routine.emoji,
    color: routine.color,
    name: routine.name,
    durationGoalTime: routine.durationGoalTime,
    weeks: routine.week,
    startGoalTime: routine.startGoalTime,
  };

  const handleClickRoutinePosts = () => {
    console.log('루틴 포스트 클릭 ', content);
    onClickRoutinePost && onClickRoutinePost(postId);
  };

  const handleClickLikeButton = () => {
    console.log('좋아요 버튼 클릭');
    onClickLikeToggle && onClickLikeToggle(postId);
  };

  return (
    <Container onClick={handleClickRoutinePosts} {...props}>
      <StyledRoutine routineObject={routineObject} type="create" />
      <ContentContainer>
        <UserInfoContainer>
          <UserProfileContainer>
            <UserAvatar src={user.profileImage} />
            <UserNameText>{user.nickname}</UserNameText>
          </UserProfileContainer>
          <LikeBox
            interactive
            active={
              loginUser
                ? likes.some((like) => like.userId === loginUser?.userId)
                : false
            }
            onClick={handleClickLikeButton}
            count={likes.length}
          />
        </UserInfoContainer>
        <TextArea disabled value={content || ''} />
        <DateText>{TimeUtils.dateFromNow(updatedAt)}</DateText>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: #f9f9f9;
  padding: 0.5rem;
  border-radius: 1rem;
  cursor: pointer;

  @media ${Media.sm} {
    flex-direction: row;
    min-width: 290px;
    height: 156px;
  }
  @media ${Media.md} {
    flex-direction: column;
    align-items: center;
  }
  @media ${Media.lg} {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledRoutine = styled(Routine)`
  min-width: 140px;
`;

const ContentContainer = styled.div`
  width: 100%;

  @media ${Media.sm} {
    padding: 0.5rem 0.5rem 0 1rem;
    height: 100%;
  }
  @media ${Media.md} {
    padding: 1rem 0.5rem 0.5rem;
  }
  @media ${Media.lg} {
    padding: 1rem 0.5rem 0.5rem;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled(Avatar)`
  margin-right: 0.5rem;
  background-color: ${Colors.pointLight};

  @media ${Media.sm} {
    width: 24px;
    height: 24px;
  }
  @media ${Media.md} {
    width: 32px;
    height: 32px;
  }
  @media ${Media.lg} {
    width: 32px;
    height: 32px;
  }
`;

const UserNameText = styled.p`
  display: -webkit-box;
  color: ${Colors.textPrimary};
  font-size: ${FontSize.base};
  overflow: hidden;
  text-overflow: ellipsis;
  height: 1rem;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 72px;
  margin: 0.5rem 0;
  font-size: ${FontSize.small};
  color: ${Colors.textSecondary};
  background-color: transparent;
  overflow: hidden;
  text-overflow: ellipsis;
  border: none;
  outline: none;
  resize: none;
  cursor: pointer;
`;

const DateText = styled.p`
  color: ${Colors.textSecondary};

  @media ${Media.sm} {
    font-size: ${FontSize.micro};
  }
  @media ${Media.md} {
    font-size: ${FontSize.small};
  }
  @media ${Media.lg} {
    font-size: ${FontSize.small};
  }
`;

export default RoutinePost;
