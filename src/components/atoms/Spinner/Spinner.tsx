import { Colors } from '@/styles';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import RingLoader from 'react-spinners/RingLoader';
import { Portal } from '@/components';

const BackgroundDim = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Spinner = ({ ...props }): JSX.Element => {
  return (
    <Portal>
      <BackgroundDim>
        <RingLoader color={Colors.yellow} {...props} />
      </BackgroundDim>
    </Portal>
  );
};

export default Spinner;
