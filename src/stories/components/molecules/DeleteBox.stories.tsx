import { DeleteBox, InputProps } from '@/components';

export default {
  title: 'Components/Molecules/ToolBox/DeleteBox',
  component: DeleteBox,
};

export const Default = ({ ...props }: InputProps): JSX.Element => (
  <DeleteBox {...props} />
);
