import { IconButtonProps, BaseButton } from './IconButton';
import { Icon } from '@/components';
import { useHover } from '@/hooks';
import { Colors } from '@/styles';

const List = ({ ...props }: IconButtonProps): JSX.Element => {
  const [hoverRef, hover] = useHover<HTMLButtonElement>();

  return (
    <BaseButton ref={hoverRef} {...props}>
      {hover ? <Icon.List color={Colors.pointLight} /> : <Icon.List />}
    </BaseButton>
  );
};

export default List;
