import React from 'react';
import styled from '@emotion/styled';
import { Colors, Shadow } from '@/styles';
import { useClickAway } from '@/hooks';
import { IconButton, Portal } from '@/components';

export interface ModalProps extends React.ComponentProps<'div'> {
  visible?: boolean;
  onClose?: () => void;
}

const Modal = ({
  children,
  visible,
  onClose,
  ...props
}: ModalProps): JSX.Element => {
  const ref = useClickAway(() => {
    onClose && onClose();
  });

  return (
    <Portal>
      <BackgroundDim visible={visible ? visible : false}>
        <ModalContainer ref={ref} {...props}>
          {children}
        </ModalContainer>
      </BackgroundDim>
    </Portal>
  );
};

const BackgroundDim = styled.div<
  React.ComponentProps<'div'> & { visible: boolean }
>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 600px;
  min-width: 280px;
  min-height: 100px;
  padding: 8px;
  border-radius: 16px;
  background-color: ${Colors.backgroundModal};
  box-shadow: ${Shadow.modal};
  box-sizing: border-box;
`;

export default Modal;
