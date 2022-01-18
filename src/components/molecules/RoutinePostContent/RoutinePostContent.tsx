import styled from '@emotion/styled';
import { Colors, Media, FontSize } from '@/styles';
import React from 'react';

export interface RoutinePostContentProps extends React.ComponentProps<'div'> {
  content?: string;
}

const RoutinePostContent = ({
  content = '',
  ...props
}: RoutinePostContentProps): JSX.Element => {
  return (
    <Container {...props}>
      <Text>{content}</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${Colors.backgroundButton}; ;
`;

const Text = styled.p``;

export default RoutinePostContent;
