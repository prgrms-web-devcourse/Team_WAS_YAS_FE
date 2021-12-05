import { IconButtonProps, BaseButton } from './IconButton';
import { Icon } from '@/components';
import { useHover } from '@/hooks';
import { Colors } from '@/styles';

const ArrowForward = ({ ...props }: IconButtonProps): JSX.Element => {
  const [hoverRef, hover] = useHover<HTMLButtonElement>();

  return (
    <BaseButton ref={hoverRef} {...props}>
      {hover ? (
        <Icon.ArrowForward color={Colors.pointLight} />
      ) : (
        <Icon.ArrowForward />
      )}
    </BaseButton>
  );
};

export default ArrowForward;
