import { Colors } from '@/styles';
import styled from '@emotion/styled';
import { RingLoader } from 'react-spinners';
import { Portal } from '@/components';

export interface SpinnerProps {
  color?: string;
  loading?: boolean;
  css?: string;
  speedMultiplier?: number;
}

const Spinner = ({ ...props }: SpinnerProps): JSX.Element => {
  return (
    <Portal>
      <BackgroundDim>
        <RingLoader color={Colors.yellow} {...props} />
      </BackgroundDim>
    </Portal>
  );
};

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

export default Spinner;
