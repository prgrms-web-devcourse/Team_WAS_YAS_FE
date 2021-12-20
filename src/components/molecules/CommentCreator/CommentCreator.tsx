import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Colors, Media, FontSize } from '@/styles';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export interface CommentCreatorProps
  extends Omit<React.ComponentProps<'form'>, 'onChange' | 'onSubmit'> {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (value: string) => void;
}

const CommentCreator = ({
  onChange,
  onSubmit,
  ...props
}: CommentCreatorProps): JSX.Element => {
  const [content, setContent] = useState<string>('');
  const user = useSelector((state: RootState) => state.user.data);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
    onChange && onChange(e);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && e.shiftKey) return;
    if (e.key === 'Enter') {
      submitContent(content);
      setContent('');
    }
  };

  const handleClickSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    submitContent(content);
  };

  const submitContent = (content: string) => {
    const newContent = content.trim();
    if (newContent === '') return;
    onSubmit && onSubmit(newContent);
  };

  return (
    <Form {...props}>
      <TextArea
        id="content"
        name="content"
        disabled={user ? false : true}
        placeholder={
          user ? '댓글을 입력하세요.' : '로그인 후 댓글을 작성할 수 있습니다.'
        }
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        value={content}
      />
      <Button
        disabled={user ? false : true}
        type="button"
        onClick={handleClickSubmitButton}
      >
        댓글 쓰기
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  width: 100%;
  height: 100px;
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

export default CommentCreator;
