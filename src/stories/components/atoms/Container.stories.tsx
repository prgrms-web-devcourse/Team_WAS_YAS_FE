import { Container } from '@/components';
import { Colors } from '@/styles';
import styled from '@emotion/styled';

export default {
  title: 'Components/Atoms/Container',
  component: Container,
};

const StyledContainer = styled(Container)`
  color: ${Colors.textPrimary};
`;

export const Default = () => {
  return (
    <>
      <StyledContainer>컨텐츠</StyledContainer>
    </>
  );
};
