import React from 'react';
import Container from './Container';
import { Icon } from '@/components/';
import styled from '@emotion/styled';
import { Colors, FontSize } from '@/styles';

const DeleteBox = (): JSX.Element => {
  return (
    <Container>
      <Icon.Delete />
      <Text>삭제하기</Text>
    </Container>
  );
};

const Text = styled.p`
  color: ${Colors.textPrimary};
  font-size: ${FontSize.small};
`;

export default DeleteBox;
