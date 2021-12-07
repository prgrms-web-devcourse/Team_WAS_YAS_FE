import { Container, ContainerProps } from '@/components';
import { Colors } from '@/styles';
import styled from '@emotion/styled';

export default {
  title: 'Components/Templates/Container',
  component: Container,
};

const StyledContainer = styled(Container)`
  color: ${Colors.textPrimary};
`;

export const Default = ({ ...props }: ContainerProps): JSX.Element => {
  return (
    <>
      <StyledContainer {...props}>컨텐츠</StyledContainer>
    </>
  );
};
