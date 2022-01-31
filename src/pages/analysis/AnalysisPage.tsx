import React from 'react';
import { Container, Calendar } from '@/components';
import styled from '@emotion/styled';
import { Colors, FontSize, FontWeight, Media } from '@/styles';

const AnalysisPage = (): JSX.Element => {
  return (
    <Container navBar>
      <Calendar />
    </Container>
  );
};

export default AnalysisPage;
