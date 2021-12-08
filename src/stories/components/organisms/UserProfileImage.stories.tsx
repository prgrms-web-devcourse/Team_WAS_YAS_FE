import { UserProfileImage } from '@/components';

export default {
  title: 'Components/Organisms/UserProfileImage',
  component: UserProfileImage,
};

export const Default = (): JSX.Element => {
  return (
    <>
      <UserProfileImage src={'https://picsum.photos/200'} />
      <UserProfileImage src={'https://picsum.photos/200'} edit />
      <UserProfileImage />
      <UserProfileImage edit />
    </>
  );
};
