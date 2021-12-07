import React from 'react';
import Container from './Container';
import { Icon } from '@/components/';
import styled from '@emotion/styled';
import { Colors, FontSize } from '@/styles';
import { useClickAway } from '@/hooks';

export interface EditBoxProps extends React.ComponentProps<'div'> {
  onClickUpdateButton: (e: React.MouseEvent) => void;
  onClickDeleteButton: (e: React.MouseEvent) => void;
  visible: boolean;
  onClose: () => void;
}

const EditBox = ({
  visible,
  onClickUpdateButton,
  onClickDeleteButton,
  onClose,
  ...props
}: EditBoxProps): JSX.Element => {
  const ref = useClickAway(() => {
    onClose && onClose();
  });

  const handleClickUpdateButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClickUpdateButton(e);
  };

  const handleClickDeleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClickDeleteButton(e);
  };

  return (
    <Container
      ref={ref}
      style={{ display: visible ? 'inline-flex' : 'none' }}
      {...props}
    >
      <StyledButton onClick={handleClickDeleteButton}>
        <Icon.Delete />
        <Text>삭제하기</Text>
      </StyledButton>
      <StyledButton onClick={handleClickUpdateButton}>
        <Icon.Edit />
        <Text>수정하기</Text>
      </StyledButton>
    </Container>
  );
};

EditBox.defaultProps = {
  visible: false,
};

const Text = styled.p`
  color: ${Colors.textPrimary};
  font-size: ${FontSize.small};
`;

const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;

  & svg {
    margin-right: 0.5rem;
  }

  &:hover {
    & path {
      fill: ${Colors.point};
    }

    & p {
      color: ${Colors.point};
    }
  }
`;

export default EditBox;
