import { RoundedButton } from '@/components';

export default {
  title: 'Components/Atoms/RoundedButton',
  component: RoundedButton,
  argTypes: {
    active: { control: 'boolean' },
  },
};

export const Default = ({ ...args }): JSX.Element => {
  return (
    <>
      <div>
        <RoundedButton.Home {...args} />
        <RoundedButton.Community {...args} />
        <RoundedButton.Analysis {...args} />
      </div>
      <div>
        <RoundedButton.Play />
        <RoundedButton.RoutineUpdate />
      </div>
    </>
  );
};
