import { LikeToggleButton, LikeToggleButtonProps } from '@/components';

export default {
  title: 'Components/Atoms/LikeToggleButton',
  component: LikeToggleButton,
  argTypes: {
    active: { control: 'boolean' },
  },
};

export const Default = ({
  active,
  ...args
}: LikeToggleButtonProps): JSX.Element => {
  const handleClick = () => {
    console.log('토글!');
  };

  return (
    <>
      <LikeToggleButton onClick={handleClick} active={active} {...args} />
    </>
  );
};
