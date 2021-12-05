import { IconButtonProps, BaseButton } from './IconButton';
import { Icon } from '@/components';

const ArrowBack = ({ ...props }: IconButtonProps): JSX.Element => {
  return (
    <BaseButton {...props}>
      <Icon.ArrowBack />
    </BaseButton>
  );
};

export default ArrowBack;
