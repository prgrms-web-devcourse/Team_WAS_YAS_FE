import { RoundedButton, RoundedButtonProps } from '@/components';

export default {
  title: 'Components/Atoms/RoundedButton',
  component: RoundedButton,
  argTypes: {
    active: { control: 'boolean' },
  },
};

export const Default = ({ ...args }: RoundedButtonProps): JSX.Element => {
  return (
    <>
      <div>
        <RoundedButton.Home {...args} />
        <RoundedButton.Community {...args} />
        <RoundedButton.Analysis {...args} />
      </div>
      <div>
        <RoundedButton.Play isPlay={false} />
        <RoundedButton.Play isPlay={true} />
        <RoundedButton.Edit />
      </div>
    </>
  );
};
