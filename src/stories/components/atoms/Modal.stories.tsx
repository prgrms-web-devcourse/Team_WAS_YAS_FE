import { Modal, ModalProps } from '@/components';
import styled from '@emotion/styled';
import { useState } from 'react';

export default {
  title: 'Components/Atoms/Modal',
  component: Modal,
};

const StyledModal = styled(Modal)`
  width: 500px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Default = ({ ...args }: ModalProps): JSX.Element => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>Show Modal</button>
      <StyledModal visible={visible} onClose={() => setVisible(false)}>
        Hi!
      </StyledModal>
    </div>
  );
};
