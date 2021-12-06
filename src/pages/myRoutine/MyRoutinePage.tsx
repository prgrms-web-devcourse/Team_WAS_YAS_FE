import React from 'react';
import { Container } from '@/components';
import { Header, IconButton } from '@/components';

const MyRoutinePage = (): JSX.Element => {
  return (
    <Container>
      <Header>
        <IconButton.Back />
        <IconButton.UserProfile />
      </Header>
      {/* <h1>MyRoutinePage</h1> */}
    </Container>
  );
};

export default MyRoutinePage;
