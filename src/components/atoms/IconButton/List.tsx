import { IconButtonProps, BaseButton } from './IconButton';
import { Icon } from '@/components';

const List = ({ ...props }: IconButtonProps): JSX.Element => {
  return (
    <BaseButton {...props}>
      <Icon.List />
    </BaseButton>
  );
};

export default List;
