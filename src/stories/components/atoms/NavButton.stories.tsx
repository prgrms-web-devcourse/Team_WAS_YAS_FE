import NavButton from '@/components/atoms/NavButton';

export default {
  title: 'Components/Atoms/NavButton',
  component: NavButton,
  argTypes: {
    active: { control: 'boolean' },
  },
};

export const Default = ({ ...args }): JSX.Element => {
  return (
    <>
      <NavButton.Community {...args} />
      <NavButton.Home {...args} />
      <NavButton.Analysis {...args} />
      <NavButton.User />
    </>
  );
};
