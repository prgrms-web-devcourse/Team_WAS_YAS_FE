import { UserToolBox, UserToolBoxProps } from '@/components';

export default {
  title: 'Components/Molecules/UserToolBox',
  component: UserToolBox,
};

export const Default = ({ ...args }: UserToolBoxProps): JSX.Element => {
  return <UserToolBox />;
};
