import { Comment, CommentProps } from '@/components';
import { UserType, CommentType } from '@/Models';

export default {
  title: 'Component/Organisms/Comment',
  component: Comment,
};

const user: UserType = {
  userId: 123,
  userName: '작성자',
  nickName: '노아',
  profileImageUrl: 'https://picsum.photos/200',
  email: 'yas@yas.com',
};

const comment: CommentType = {
  commentId: 321,
  text: '노아가 댓글을 작성했습니다.',
  userId: '123ㄴ',
  createdAt: '2021-01-01 11:11',
  updatedAt: '2021-01-01 11:11',
  likes: [],
};

export const Default = ({ ...args }: CommentProps): JSX.Element => {
  return <></>;
};
