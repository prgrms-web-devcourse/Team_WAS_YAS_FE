import { Comment, CommentProps } from '@/components';
// import { UserType, CommentType } from '@/Models';
import styled from '@emotion/styled';

export default {
  title: 'Components/Organisms/Comment',
  component: Comment,
};

// const user1: UserType = {
//   userId: 123,
//   name: '작성자',
//   nickname: '노아',
//   profileImage: 'https://picsum.photos/200',
//   email: 'yas@yas.com',
// };

// const user2: UserType = {
//   userId: 123,
//   name: '작성자',
//   nickname: '죠지',
//   profileImage: 'https://picsum.photos/300',
//   email: 'yas@yas.com',
// };

// const comment1: CommentType = {
//   commentId: 321,
//   text: '노아가 댓글을 작성했습니다.\n\n\n\n\n\n\n\n\n\n 123',
//   userId: 123,
//   createdAt: '2021-01-01 11:11',
//   updatedAt: '2021-01-01 11:11',
//   likes: [],
// };

// const comment2: CommentType = {
//   commentId: 321,
//   text: '죠지가 조이를 쳐다봅니다.',
//   userId: 123,
//   createdAt: '2021-01-01 11:11',
//   updatedAt: '2021-01-01 11:11',
//   likes: [],
// };

const StyledComment = styled(Comment)`
  margin-top: 4rem;
`;

export const Default = ({ ...args }: CommentProps): JSX.Element => {
  const handleClickLike = (commentId: number) => {
    console.log('좋아요 버튼 클릭', commentId);
  };

  const handleEditComment = (commentId: number, editedText: string) => {
    console.log('댓글 수정', commentId, editedText);
  };

  const handleDeleteComment = (commentId: number) => {
    console.log('댓글 삭제', commentId);
  };

  return (
    <>
      {/* <StyledComment
        user={user1}
        comment={comment1}
        editable
        onClickLike={handleClickLike}
        onDeleteComment={handleDeleteComment}
        onEditComment={handleEditComment}
      ></StyledComment>
      <StyledComment user={user2} comment={comment2}></StyledComment> */}
    </>
  );
};
