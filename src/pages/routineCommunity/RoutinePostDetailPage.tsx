import React, { useState } from 'react';
import {
  Container,
  LikeBox,
  RoutineInfo,
  RoutineCategory,
  Mission,
  Comment,
  CommentCreator,
} from '@/components';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { routineDummy, userDummy, missionDummy, commentDummy } from '@/Models';
import { Avatar } from '@mui/material';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { ROUTINE_CATEGORY } from '@/constants';
import { Colors, Media, FontSize } from '@/styles';

const RoutinePostDetailPage = (): JSX.Element => {
  const [missionOpened, setMissionOpened] = useState<boolean>(false);
  const [commentOpened, setCommentOpened] = useState<boolean>(false);

  return (
    <Container navBar>
      <RoutineInfoHeader>
        <AuthorInfoWrapper>
          <Avatar src={userDummy.profileImageUrl} />
          <AuthorNameText>{userDummy.nickName}</AuthorNameText>
        </AuthorInfoWrapper>
        <LikeBox interactive />
      </RoutineInfoHeader>
      <RoutineInfo
        createdAt={routineDummy.startGoalTime}
        routineObject={routineDummy}
      />
      <RoutineInfoFooter>
        <CategoryWrapper>
          {routineDummy.routineCategories.map((category: string) => (
            <RoutineCategory key={category}>
              {ROUTINE_CATEGORY[category]}
            </RoutineCategory>
          ))}
        </CategoryWrapper>
        <BringRoutineButton>
          <GetAppRoundedIcon />
          루틴 가져오기
        </BringRoutineButton>
      </RoutineInfoFooter>
      <MissionContainer open={missionOpened}>
        <Mission type="create" missionObject={missionDummy} />
        <Mission type="create" missionObject={missionDummy} />
        <Mission type="create" missionObject={missionDummy} />
        <Mission type="create" missionObject={missionDummy} />
        <Mission type="create" missionObject={missionDummy} />
        <Mission type="create" missionObject={missionDummy} />
        <SpreadButton>
          <KeyboardArrowDownRoundedIcon />
          펼치기
        </SpreadButton>
      </MissionContainer>
      <CommentContainer open={missionOpened}>
        <SpreadButton>
          댓글
          <KeyboardArrowDownRoundedIcon />
        </SpreadButton>
        <Comment user={userDummy} comment={commentDummy} />
        <Comment user={userDummy} comment={commentDummy} />
        <Comment user={userDummy} comment={commentDummy} />
      </CommentContainer>
      <CommentCreator />
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
`;

const AuthorInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthorNameText = styled.p``;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  /* width: 100%; */
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

  &:hover {
    background-color: ${Colors.pointLight};
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

const MissionContainer = styled.div<
  React.ComponentProps<'div'> & { open: boolean }
>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  width: 100%;
`;

const SpreadButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: ${Colors.point}; */
  border: none;
  border-radius: 1rem;
  color: ${Colors.textPrimary};
  font-size: ${FontSize.small};
  padding: 0 0.5rem;
  height: 2rem;

  &:hover {
    background-color: ${Colors.pointLight};
  }

  &: active {
    background-color: ${Colors.backgroundButton};
  }
`;

const CommentContainer = styled.div<
  React.ComponentProps<'div'> & { open: boolean }
>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  width: 100%;
  // height: ${({ open }) => (open ? null : '100px')};
`;

export default RoutinePostDetailPage;
