import { Icon, IconProps } from '@/components';

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

export const Default = (): JSX.Element => {
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
      <Icon.Community />
    </>
  );
};

export const ArrowBack = ({ ...props }: IconProps): JSX.Element => (
  <Icon.ArrowBack {...props} />
);

export const ArrowForward = ({ ...props }: IconProps): JSX.Element => (
  <Icon.ArrowForward {...props} />
);

export const Close = ({ ...props }: IconProps): JSX.Element => (
  <Icon.Close {...props} />
);

export const Delete = ({ ...props }: IconProps): JSX.Element => (
  <Icon.Delete {...props} />
);

export const Edit = ({ ...props }: IconProps): JSX.Element => (
  <Icon.Edit {...props} />
);

export const Like = ({ ...props }: IconProps): JSX.Element => (
  <Icon.Like {...props} />
);

export const LikeBorder = ({ ...props }: IconProps): JSX.Element => (
  <Icon.LikeBorder {...props} />
);

export const List = ({ ...props }: IconProps): JSX.Element => (
  <Icon.List {...props} />
);

export const UserProfile = ({ ...props }: IconProps): JSX.Element => (
  <Icon.UserProfile {...props} />
);

export const UserProfileImageUploader = ({
  ...props
}: IconProps): JSX.Element => <Icon.UserProfileImageUploader {...props} />;
