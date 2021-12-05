import { Input, InputProps } from '@/components';

export default {
  title: 'Components/Molecules/ToolBox/EditBox',
  component: Input,
};

export const Default = ({ ...props }: InputProps): JSX.Element => (
  <Input {...props} />
);
