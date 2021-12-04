import React from 'react';
import styled from '@emotion/styled';
import { Media } from '@/styles';

type DivProps = React.ComponentProps<'div'>;

const Container = ({ children, ...props }: DivProps): JSX.Element => {
  return <StyledDiv {...props}>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  height: 100vh;

  @media ${Media.sm} {
    max-width: 320px;
    padding: 0 15px;
  }
  @media ${Media.md} {
    max-width: 768px;
    padding: 0 40px;
  }
  @media ${Media.lg} {
    max-width: 768px;
    padding: 0 40px;
  }
`;

export default Container;
