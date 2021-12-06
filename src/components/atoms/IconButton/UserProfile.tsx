import { IconButtonProps, BaseButton } from './IconButton';
import { Icon } from '@/components';

const UserProfile = ({ ...props }: IconButtonProps): JSX.Element => {
  return (
    <BaseButton {...props}>
      <Icon.UserProfile />
    </BaseButton>
  );
};

export default UserProfile;
