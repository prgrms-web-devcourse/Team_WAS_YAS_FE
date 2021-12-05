import { Input, InputProps } from '@/components';

export default {
  title: 'Components/Atoms/Input',
  component: Input,
};

export const Default = ({ ...props }: InputProps): JSX.Element => (
  <Input {...props} />
);
