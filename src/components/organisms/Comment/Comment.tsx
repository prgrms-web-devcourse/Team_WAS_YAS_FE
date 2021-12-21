import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled/';
import { EditBox, LikeBox, SpreadToggle } from '@/components';
import { Colors, Media, FontSize } from '@/styles';
import { IconButton, Avatar } from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';
import Editor from './Editor';
import { CommentType } from '@/Models';
import moment from 'moment';
import { css } from '@emotion/react';

export interface CommentProps extends React.ComponentProps<'div'> {
  comment: CommentType;
  editable?: boolean;
  onEditComment?: (commentId: number, editedText: string) => void;
  onDeleteComment?: (commentId: number) => void;
  onClickLikeToggle?: (commentId: number, prevToggled: boolean) => void;
  likeToggled?: boolean;
  likeCount?: number;
}

const Comment = ({
  comment,
  editable,
  onEditComment,
  onDeleteComment,
  onClickLikeToggle,
  likeToggled,
  likeCount,
  ...props
}: CommentProps): JSX.Element => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>(comment.content);
  const [editBoxVisible, setEditBoxVisible] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [openable, setOpenable] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  // TODO: useRef로 변경하기
  const scrollHeight = ref.current?.scrollHeight;

  useEffect(() => {
    if (!ref.current?.scrollHeight) return;
    setOpenable(ref.current?.scrollHeight > 48);
  }, [setOpenable]);

  const handleClickMoreIconButton = () => {
    setEditBoxVisible(true);
  };

  const handleCloseDeleteBox = () => {
    setEditBoxVisible(false);
  };

  const handleClickDeleteButton = () => {
    onDeleteComment && onDeleteComment(comment.commentId);
  };

  const handleClickUpdateButton = () => {
    setEditMode(true);
    setOpened(false);
  };

  const handleClickLikeButton = (likCount: number, prevToggled: boolean) => {
    onClickLikeToggle && onClickLikeToggle(comment.commentId, prevToggled);
  };

  const handleSubmit = (newText: string) => {
    setText(newText);
    setEditMode(false);
    onEditComment && onEditComment(comment.commentId, newText);
  };

  const handleClickSpreadToggle = () => {
    setOpened((opened) => !opened);
  };

  return (
    <Container {...props}>
      <Header>
        <UserInfoContainer>
          <StyledAvatar
            src={
              comment.user.profileImage ? comment.user.profileImage : undefined
            }
          />
          <UserInfoTextWrapper>
            <UserNameText>{comment.user.nickname}</UserNameText>
            <DateText>
              {moment(comment.updatedAt).format('YYYY-MM-DD hh:mm')}
            </DateText>
          </UserInfoTextWrapper>
        </UserInfoContainer>
        <ToolWrapper>
          <LikeBox
            interactive
            active={likeToggled}
            count={likeCount ? likeCount : 0}
            onClick={handleClickLikeButton}
          />
          {editable && (
            <IconButton
              style={{ padding: 0 }}
              onClick={handleClickMoreIconButton}
            >
              <MoreVert />
            </IconButton>
          )}
        </ToolWrapper>
      </Header>
      {editable && editMode ? (
        <Editor
          initText={text}
          onSubmit={handleSubmit}
          onClose={() => {
            setEditMode(false);
          }}
        />
      ) : (
        <TextArea
          opened={opened}
          height={scrollHeight}
          ref={ref}
          readOnly
          id="text"
          name="text"
          value={text}
        />
      )}
      {openable && !editMode && (
        <SpreadToggleWrapper>
          <SpreadToggle onClick={handleClickSpreadToggle} />
        </SpreadToggleWrapper>
      )}
      {editable && (
        <StyledEditBox
          visible={editBoxVisible}
          onClose={handleCloseDeleteBox}
          onClickDeleteButton={handleClickDeleteButton}
          onClickUpdateButton={handleClickUpdateButton}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  min-width: 290px;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${Colors.backgroundButton};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 1rem;
`;

const TextArea = styled.textarea<
  React.ComponentProps<'textarea'> & {
    opened: boolean;
    height: number | undefined;
  }
>`
  width: 100%;
  height: ${({ opened, height }) => (opened ? `${height}px` : '3rem')};
  margin-top: 1rem;
  overflow-y: hidden;
  text-overflow: ellipsis;
  ${({ disabled }) =>
    disabled
      ? css`
          padding-top: 1rem;
        `
      : css`
          padding: 0.5rem;
        `}
  border: none;
  border-radius: 8px 0 0 8px;
  outline: none;
  color: ${Colors.textPrimary};
  background-color: transparent;
  resize: none;

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

const UserInfoContainer = styled.div`
  display: flex;
`;

const UserInfoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserNameText = styled.p`
  color: ${Colors.textPrimary};
  font-size: ${FontSize.base};
  margin-bottom: 0.5rem;
`;

const DateText = styled.p`
  color: ${Colors.textSecondary};
  font-size: ${FontSize.micro};
`;

const ToolWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const SpreadToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledEditBox = styled(EditBox)`
  position: absolute;
  top: -3rem;
  right: 1rem;
  z-index: 1;
`;

export default Comment;
