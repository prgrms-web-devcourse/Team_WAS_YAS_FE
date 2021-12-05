import { IconButtonProps, BaseButton } from './IconButton';
import { Icon } from '@/components';
import { useHover } from '@/hooks';
import { Colors } from '@/styles';

const UserProfile = ({ ...props }: IconButtonProps): JSX.Element => {
  const [hoverRef, hover] = useHover<HTMLButtonElement>();

  return (
    <BaseButton ref={hoverRef} {...props}>
      {hover ? (
        <Icon.UserProfile size={48} color={Colors.pointLight} />
      ) : (
        <Icon.UserProfile size={48} color={Colors.point} />
      )}
    </BaseButton>
  );
};

export default UserProfile;
