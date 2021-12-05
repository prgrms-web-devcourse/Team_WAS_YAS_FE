import { Icon } from '@/components';

export default {
  title: 'Components/Atoms/Icon',
  component: Icon,
  argTypes: {
    color: {
      control: 'color',
    },
    size: { control: 'number' },
  },
};

export const Default = () => {
  return (
    <>
      <Icon.ArrowBack />
      <Icon.ArrowForward />
      <Icon.Close />
      <Icon.Delete />
      <Icon.Edit />
      <Icon.Like />
      <Icon.LikeBorder />
      <Icon.List />
      <Icon.UserProfile />
      <Icon.UserProfileImageUploader />
    </>
  );
};

export const ArrowBack = ({ ...props }) => <Icon.ArrowBack {...props} />;

export const ArrowForward = ({ ...props }) => <Icon.ArrowForward {...props} />;

export const Close = ({ ...props }) => <Icon.Close {...props} />;

export const Delete = ({ ...props }) => <Icon.Delete {...props} />;

export const Edit = ({ ...props }) => <Icon.Edit {...props} />;

export const Like = ({ ...props }) => <Icon.Like {...props} />;

export const LikeBorder = ({ ...props }) => <Icon.LikeBorder {...props} />;

export const List = ({ ...props }) => <Icon.List {...props} />;

export const UserProfile = ({ ...props }) => <Icon.UserProfile {...props} />;

export const UserProfileImageUploader = ({ ...props }) => (
  <Icon.UserProfileImageUploader {...props} />
);
