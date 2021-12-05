import { Text } from '@/components';

export default {
  title: 'Components/Atoms/Text',
  component: Text,
  argTypes: {
    block: { control: 'boolean' },
    color: { control: 'color' },
    fontSize: { control: 'text' },
    fontWeight: { control: 'number' },
  },
};

export const Default = ({ ...args }): JSX.Element => {
  return (
    <>
      <Text {...args}>Text1</Text>
      <Text {...args}>Text2</Text>
    </>
  );
};
