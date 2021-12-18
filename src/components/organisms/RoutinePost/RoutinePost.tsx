import React from 'react';
import { Routine, LikeBox } from '@/components';
import { RoutinePostWindowType, RoutineType } from '@/Models';
import styled from '@emotion/styled';
import { Colors, Media, FontSize } from '@/styles';
import { Avatar } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store';

export interface RoutinePostProps extends React.ComponentProps<'div'> {
  routinePost: RoutinePostWindowType;
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
  ...props
}: RoutinePostProps): JSX.Element => {
  // const { data: loginUser } = useSelector((state: RootState) => state.user);
  const routineObject: Pick<
    RoutineType,
    'emoji' | 'color' | 'name' | 'durationGoalTime' | 'startGoalTime' | 'weeks'
  > = {
    emoji: routine.emoji,
    color: routine.color,
    name: routine.name,
    durationGoalTime: routine.durationGoalTime,
    weeks: routine.weeks,
    startGoalTime: routine.startGoalTime,
  };

  return (
    <Container {...props}>
      <Routine routineObject={routineObject} type="create" />
      <ContentContainer>
        <UserInfoContainer>
          <UserProfileContainer>
            <UserAvatar src={user.profileImage} />
            <UserNameText>{user.nickname}</UserNameText>
          </UserProfileContainer>
          <LikeBox
            interactive
            // active={likes.some((like) => like.userId === loginUser?.userId)}
            count={likes.length}
          />
        </UserInfoContainer>
        <TextArea disabled value={content} />
        <DateText>{updatedAt}</DateText>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  display: inline-flex;
  background-color: #f9f9f9;
  padding: 0.5rem;
  border-radius: 1rem;

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

const ContentContainer = styled.div`
  @media ${Media.sm} {
    padding: 0.5rem 0.5rem 0 1rem;
    height: 100%;
  }
  @media ${Media.md} {
    padding: 1rem 0.5rem 0.5rem;
    width: 100%;
  }
  @media ${Media.lg} {
    padding: 1rem 0.5rem 0.5rem;
    width: 100%;
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
