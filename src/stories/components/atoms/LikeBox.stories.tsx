import { LikeBox, LikeBoxProps } from '@/components';

export default {
  title: 'Components/Atoms/LikeBox',
  component: LikeBox,
  argTypes: {
    active: { control: 'boolean' },
  },
};

export const Default = ({ ...args }: LikeBoxProps): JSX.Element => {
  const handleClick = () => {
    console.log('토글!');
  };

  return (
    <>
      <LikeBox onClick={handleClick} active />
      <LikeBox onClick={handleClick} count={32} />
      <LikeBox onClick={handleClick} count={12} active interactive />
      <LikeBox onClick={handleClick} count={32} interactive />
    </>
  );
};
