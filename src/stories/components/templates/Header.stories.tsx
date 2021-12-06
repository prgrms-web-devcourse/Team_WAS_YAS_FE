import { Header, HeaderProps } from '@/components';
import { IconButton } from '@/components';

export default {
  title: 'Components/Templates/Button',
  component: Header,
};

export const Default = ({ ...args }: HeaderProps): JSX.Element => {
  return (
    <>
      <Header>
        <IconButton.Back />
        <IconButton.UserProfile />
        <IconButton.UserProfile />
        <IconButton.UserProfile />
        <IconButton.UserProfile />
      </Header>
      <Header>
        <IconButton.Back />
        <IconButton.Close />
      </Header>
    </>
  );
};
