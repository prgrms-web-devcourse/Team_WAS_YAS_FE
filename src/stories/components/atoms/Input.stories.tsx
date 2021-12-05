import { Input, InputProps } from '@/components';

export default {
  title: 'Components/Atoms/Container',
  component: Input,
};

export const Default = ({ ...props }: InputProps): JSX.Element => (
  <Input {...props} />
);
