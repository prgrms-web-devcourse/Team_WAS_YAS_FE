import { LikeBox, LikeBoxProps } from '@/components';

export default {
  title: 'Components/Atoms/LikeBox',
  component: LikeBox,
  argTypes: {
    active: { control: 'boolean' },
  },
};

export const Default = ({ active, ...args }: LikeBoxProps): JSX.Element => {
  const handleClick = () => {
    console.log('토글!');
  };

  return (
    <>
      <LikeBox onClick={handleClick} active={active} {...args} />
    </>
  );
};
