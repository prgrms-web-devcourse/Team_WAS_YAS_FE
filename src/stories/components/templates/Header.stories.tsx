import { Header, HeaderProps, IconButton } from '@/components';

export default {
  title: 'Components/Templates/Header',
  component: Header,
};

export const Default = ({ ...args }: HeaderProps): JSX.Element => {
  return (
    <>
      <Header>
        <IconButton.Back />
        <h1>로고</h1>
        <IconButton.UserProfile />
      </Header>
      <Header>
        <IconButton.Back />
        <IconButton.Close />
      </Header>
      <Header>
        <IconButton.Back />
        <h1>자식은 3개까지만 허용 나머지는 무시 된다.</h1>
        <IconButton.Close />
        <IconButton.UserProfile />
        <IconButton.UserProfile />
      </Header>
    </>
  );
};
