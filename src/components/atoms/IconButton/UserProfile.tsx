import { IconButtonProps, BaseButton } from './IconButton';
import { Icon } from '@/components';
import { useHistory } from 'react-router-dom';

const UserProfile = ({ onClick, ...props }: IconButtonProps): JSX.Element => {
  const history = useHistory();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    history.push('/mypage');
    onClick && onClick(e);
  };

  return (
    <BaseButton onClick={handleClick} {...props}>
      <Icon.UserProfile />
    </BaseButton>
  );
};

export default UserProfile;
