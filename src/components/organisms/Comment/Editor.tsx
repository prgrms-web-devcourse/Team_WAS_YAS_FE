import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Colors, Media, FontSize, FontWeight } from '@/styles';

interface EditorProps extends Omit<React.ComponentProps<'form'>, 'onSubmit'> {
  initText: string;
  onSubmit: (text: string) => void;
  onClose: () => void;
}

const Editor = ({
  initText,
  onSubmit,
  onClose,
  ...props
}: EditorProps): JSX.Element => {
  const [text, setText] = useState<string>(initText);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && onSubmit(text);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit} {...props}>
      <TextArea id="text" name="text" value={text} onChange={handleChange} />
      <ButtonWrapper>
        <ConfirmButton type="submit">수정하기</ConfirmButton>
        <CancelButton type="button" onClick={onClose}>
          취소하기
        </CancelButton>
      </ButtonWrapper>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  width: 100%;
  height: 120px;
  margin: 0.5rem 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: ${({ disabled }) => (disabled ? '1rem' : '0.5rem')};
  border: none;
  border-radius: 8px 0 0 8px;
  outline: none;
  color: ${Colors.textPrimary};
  background-color: ${({ disabled }) =>
    disabled ? 'transparent' : Colors.backgroundModal};
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConfirmButton = styled.button`
  width: 100px;
  height: 100%;
  background-color: ${Colors.functionConfirm};
  border: none;
  border-radius: 0.5rem 0.5rem 0 0;
  color: ${Colors.textQuaternary};
  font-weight: ${FontWeight.bold};

  color: ${Colors.textQuaternary};
  cursor: pointer;

  &:active {
    background-color: ${Colors.functionConfirm};
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

const CancelButton = styled.button`
  width: 100px;
  height: 100%;
  background-color: ${Colors.functionNegative};
  border: none;
  border-radius: 0 0 0.5rem 0.5rem;
  color: ${Colors.textQuaternary};
  font-weight: ${FontWeight.bold};
  cursor: pointer;

  &:active {
    background-color: ${Colors.functionNegative};
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

export default Editor;
