// eslint-disable-next-line
import { Container } from '@/components';
// eslint-disable-next-line
import { colors } from '@/styles';
import styled from '@emotion/styled';

export default {
  title: 'Components/Atoms/Container',
  component: Container,
};

const StyledContainer = styled(Container)`
  color: ${colors['text-primary']};
`;

export const Default = () => {
  return (
    <>
      <StyledContainer>컨텐츠</StyledContainer>
    </>
  );
};
