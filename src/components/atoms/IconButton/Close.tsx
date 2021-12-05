import { IconButtonProps, BaseButton } from './IconButton';
import { Icon } from '@/components';

const Close = ({ ...props }: IconButtonProps): JSX.Element => {
  return (
    <BaseButton {...props}>
      <Icon.Close />
    </BaseButton>
  );
};

export default Close;
