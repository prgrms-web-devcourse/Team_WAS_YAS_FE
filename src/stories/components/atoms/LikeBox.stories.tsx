import { LikeBox, LikeBoxProps } from '@/components';

export default {
  title: 'Components/Atoms/LikeBox',
  component: LikeBox,
  argTypes: {
    active: { control: 'boolean' },
    count: { control: 'number' },
    interactive: { control: 'boolean' },
  },
};

export const Default = ({ ...args }: LikeBoxProps): JSX.Element => {
  return <LikeBox {...args} />;
};
