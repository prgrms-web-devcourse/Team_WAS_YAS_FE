import { useState } from 'react';
import { DeleteBox, DeleteBoxProps } from '@/components';

export default {
  title: 'Components/Molecules/ToolBox/DeleteBox',
  component: DeleteBox,
  argTypes: {
    onClickDeleteButton: { action: 'clicked' },
  },
};

export const Default = ({
  ...args
}: Pick<DeleteBoxProps, 'onClickDeleteButton'>): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleCloseDeleteBox = () => {
    setVisible(false);
  };

  return (
    <>
      <button onClick={() => setVisible(true)}>Show DeleteBox</button>
      <DeleteBox visible={visible} onClose={handleCloseDeleteBox} {...args} />
    </>
  );
};
