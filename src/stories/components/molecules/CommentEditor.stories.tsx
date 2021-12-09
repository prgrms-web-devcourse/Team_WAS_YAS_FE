import { CommentEditor } from '@/components';

export default {
  title: 'Components/Molecules/CommentEditor',
  component: CommentEditor,
};

export const Default = ({ ...args }): JSX.Element => {
  return <CommentEditor />;
};
