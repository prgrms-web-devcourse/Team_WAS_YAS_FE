import { IconButton, IconButtonProps } from '@/components';
import styled from '@emotion/styled';

export default {
  title: 'Components/Atoms/IconButton',
  component: IconButton,
  argTypes: {
    onClick: { action: 'onClick' },
  },
};

const Container = styled.div`
  display: flex;
`;

export const Default = ({ ...props }: IconButtonProps): JSX.Element => (
  <Container>
    <IconButton.List {...props} />
    <IconButton.UserProfile {...props} />
    <IconButton.ArrowBack {...props} />
    <IconButton.ArrowForward {...props} />
    <IconButton.Close {...props} />
    <IconButton.Check {...props} />
    <IconButton.Add {...props} />
    <IconButton.Back {...props} />
  </Container>
);
