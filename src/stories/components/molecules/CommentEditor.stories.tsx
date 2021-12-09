import { CommentEditor, CommentEditorProps } from '@/components';
import React, { useState } from 'react';

export default {
  title: 'Components/Molecules/CommentEditor',
  component: CommentEditor,
};

export const Default = ({ ...args }: CommentEditorProps): JSX.Element => {
  const [changedComment, setChangedComment] = useState<string>('');
  const [submittedComment, setSubmittedComment] = useState<string>('');

  const handleSubmit = (value: string) => {
    setSubmittedComment(value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement> & { target: HTMLTextAreaElement },
  ) => {
    setChangedComment(e.target.value);
  };

  return (
    <>
      <CommentEditor onSubmit={handleSubmit} onChange={handleChange} />
      <p>{'onChange : ' + changedComment}</p>
      <p>{'onSubmit : ' + submittedComment}</p>
    </>
  );
};
