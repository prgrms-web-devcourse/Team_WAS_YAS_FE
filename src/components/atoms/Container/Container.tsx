import React from 'react';
// eslint-disable-next-line
import styled from '@emotion/styled';
// eslint-disable-next-line
import { media, fontSize } from '@/styles';

type DivProps = React.ComponentProps<'div'>;

const Container = ({ children, ...props }: DivProps): JSX.Element => {
  return <StyledDiv {...props}>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  height: 100vh;

  @media ${media.sm} {
    max-width: 320px;
    padding: 0 15px;
  }
  @media ${media.md} {
    max-width: 768px;
    padding: 0 40px;
  }
  @media ${media.lg} {
    max-width: 768px;
    padding: 0 40px;
  }
`;

export default Container;
