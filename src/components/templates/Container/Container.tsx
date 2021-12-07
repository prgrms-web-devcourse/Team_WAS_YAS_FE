import React from 'react';
import styled from '@emotion/styled';
import { NavBar, Header, IconButton } from '@/components';
import { Media } from '@/styles';

export interface ContainerProps extends React.ComponentProps<'div'> {
  navBar?: boolean;
}

const Container = ({
  children,
  navBar,
  ...props
}: ContainerProps): JSX.Element => {
  return (
    <StyledDiv {...props}>
      <Header>
        <IconButton.UserProfile />
      </Header>
      {children}
      {navBar && <NavBar />}
    </StyledDiv>
  );
};

const defaultProps: ContainerProps = {
  navBar: false,
};

Container.defaultProps = defaultProps;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 768px;
  margin: 0 auto;
  height: 100vh;
  overflow: auto;

  @media ${Media.sm} {
    padding: 0 15px;
  }
  @media ${Media.md} {
    padding: 0 40px;
  }
  @media ${Media.lg} {
    padding: 0 40px;
  }
`;

export default React.memo<ContainerProps>(Container);
