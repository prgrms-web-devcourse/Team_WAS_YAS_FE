import { Colors } from '@/styles';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import RingLoader from 'react-spinners/RingLoader';

const LoaderStyle = css`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Spinner = ({ ...props }): JSX.Element => {
  return <RingLoader color={Colors.yellow} {...props} css={LoaderStyle} />;
};

export default Spinner;
