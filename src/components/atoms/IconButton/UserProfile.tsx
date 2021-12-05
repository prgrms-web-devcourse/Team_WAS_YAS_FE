import { IconButtonProps, BaseButton } from './IconButton';
import { Icon } from '@/components';

const UserProfile = ({ ...props }: IconButtonProps): JSX.Element => {
  return (
    <BaseButton {...props}>
      <Icon.UserProfile size={48} />
    </BaseButton>
  );
};

export default UserProfile;
