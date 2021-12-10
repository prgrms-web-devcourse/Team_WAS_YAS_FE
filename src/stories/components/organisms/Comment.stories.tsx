import { Comment, CommentProps } from '@/components';
import { UserType, CommentType } from '@/Models';
import styled from '@emotion/styled';

export default {
  title: 'Components/Organisms/Comment',
  component: Comment,
};

const user1: UserType = {
  userId: 123,
  userName: '작성자',
  nickName: '노아',
  profileImageUrl: 'https://picsum.photos/200',
  email: 'yas@yas.com',
};

const user2: UserType = {
  userId: 123,
  userName: '작성자',
  nickName: '죠지',
  profileImageUrl: 'https://picsum.photos/300',
  email: 'yas@yas.com',
};

const comment1: CommentType = {
  commentId: 321,
  text: '노아가 댓글을 작성했습니다.',
  userId: 123,
  createdAt: '2021-01-01 11:11',
  updatedAt: '2021-01-01 11:11',
  likes: [],
};

const comment2: CommentType = {
  commentId: 321,
  text: '죠지가 조이를 쳐다봅니다.',
  userId: 123,
  createdAt: '2021-01-01 11:11',
  updatedAt: '2021-01-01 11:11',
  likes: [],
};

const StyledComment = styled(Comment)`
  margin-top: 4rem;
`;

export const Default = ({ ...args }: CommentProps): JSX.Element => {
  return (
    <>
      <StyledComment user={user1} comment={comment1} editable></StyledComment>
      <StyledComment user={user2} comment={comment2}></StyledComment>
    </>
  );
};
