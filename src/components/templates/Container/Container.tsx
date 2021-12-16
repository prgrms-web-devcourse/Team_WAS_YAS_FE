import React from 'react';
import styled from '@emotion/styled';
import { Media } from '@/styles';
import { NavBar, Header } from '@/components';

export interface ContainerProps extends React.ComponentProps<'div'> {
  navBar?: boolean;
}

const Container = ({
  children,
  navBar,
  ...props
}: ContainerProps): JSX.Element => {
  return (
    <AppContainer>
      <Header />
      <ContentContainer {...props}>{children}</ContentContainer>
      {navBar && <NavBar />}
    </AppContainer>
  );
};

const defaultProps: ContainerProps = {
  navBar: false,
};

Container.defaultProps = defaultProps;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 768px;
  margin: 0 auto;

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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 60px;

  @media ${Media.sm} {
    padding-bottom: 56px;
  }
  @media ${Media.md} {
    padding-bottom: 100px;
  }
  @media ${Media.lg} {
    padding-bottom: 100px;
  }
`;

export default React.memo<ContainerProps>(Container);
