import { IconButtonProps, BaseButton } from './IconButton';
import { Icon } from '@/components';
import { useHover } from '@/hooks';
import { Colors } from '@/styles';

const ArrowBack = ({ ...props }: IconButtonProps): JSX.Element => {
  const [hoverRef, hover] = useHover<HTMLButtonElement>();

  return (
    <BaseButton ref={hoverRef} {...props}>
      {hover ? (
        <Icon.ArrowBack color={Colors.pointLight} />
      ) : (
        <Icon.ArrowBack />
      )}
    </BaseButton>
  );
};

export default ArrowBack;
