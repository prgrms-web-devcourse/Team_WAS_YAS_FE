import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Colors, Media, FontSize } from '@/styles';

export interface CommentEditorProps
  extends Omit<React.ComponentProps<'form'>, 'onChange' | 'onSubmit'> {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (value: string) => void;
}

const CommentEditor = ({
  onChange,
  onSubmit,
  ...props
}: CommentEditorProps): JSX.Element => {
  const [comment, setComment] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(e.target.value);
    onChange && onChange(e);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement },
  ): void => {
    e.preventDefault();
    onSubmit && onSubmit(comment);
  };

  return (
    <Form onSubmit={handleSubmit} {...props}>
      <TextArea
        id="comment"
        name="comment"
        placeholder="댓글을 입력하세요."
        onChange={handleChange}
        value={comment}
      />
      <Button type="submit">댓글 쓰기</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  width: 100%;
  height: 120px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px 0 0 8px;
  outline: none;
  background-color: ${Colors.backgroundButton};
  resize: none;

  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
  @media ${Media.md} {
    font-size: ${FontSize.medium};
  }
  @media ${Media.lg} {
    font-size: ${FontSize.medium};
  }
`;

const Button = styled.button`
  width: 100px;
  height: 100%;
  background-color: ${Colors.point};
  border: none;
  border-radius: 0 8px 8px 0;
  color: ${Colors.textQuaternary};
  cursor: pointer;

  &:active {
    background-color: ${Colors.pointLight};
  }

  @media ${Media.sm} {
    font-size: ${FontSize.small};
  }
  @media ${Media.md} {
    font-size: ${FontSize.medium};
  }
  @media ${Media.lg} {
    font-size: ${FontSize.medium};
  }
`;

export default CommentEditor;
