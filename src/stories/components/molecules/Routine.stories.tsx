import { Routine, RoutineProps } from '@/components';
import { Colors } from '@/styles';

export default {
  title: 'Components/Molecules/Routine',
  component: Routine,
  argTypes: {
    color: {
      control: 'inline-radio',
      options: [
        Colors.red,
        Colors.pink,
        Colors.orange,
        Colors.yellow,
        Colors.lime,
        Colors.green,
      ],
    },
  },
};

export const Default = (): JSX.Element => {
  return (
    <>
      <Routine type="myRoutine" />
      <Routine type="communityRoutine" />
      <Routine type="communityMyRoutine" />
      <Routine type="create" />
    </>
  );
};

export const MyRoutine = ({ type, ...args }: RoutineProps): JSX.Element => {
  return <Routine type="myRoutine" {...args} />;
};

export const CommunityRoutine = ({
  type,
  ...args
}: RoutineProps): JSX.Element => {
  return <Routine type="communityRoutine" {...args} />;
};

export const CommunityMyRoutine = ({
  type,
  ...args
}: RoutineProps): JSX.Element => {
  return <Routine type="communityMyRoutine" {...args} />;
};

export const Create = ({ type, ...args }: RoutineProps): JSX.Element => {
  return <Routine type="create" {...args} />;
};
