import { IconButtonProps, BaseButton } from './IconButton';
import { Icon } from '@/components';

const ArrowForward = ({ ...props }: IconButtonProps): JSX.Element => {
  return (
    <BaseButton {...props}>
      <Icon.ArrowForward />
    </BaseButton>
  );
};

export default ArrowForward;
