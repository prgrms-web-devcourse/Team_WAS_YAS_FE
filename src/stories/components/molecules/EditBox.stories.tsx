import { useState } from 'react';
import { EditBox, EditBoxProps } from '@/components';

export default {
  title: 'Components/Molecules/ToolBox/EditBox',
  component: EditBox,
  argTypes: {
    onClickUpdateButton: { action: 'clicked' },
    onClickDeleteButton: { action: 'clicked' },
  },
};

export const Default = ({
  ...args
}: Omit<EditBoxProps, 'visible' | 'onClose'>): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleCloseDeleteBox = () => {
    setVisible(false);
  };

  return (
    <>
      <button onClick={() => setVisible(true)}>Show EditBox</button>
      <EditBox visible={visible} onClose={handleCloseDeleteBox} {...args} />
    </>
  );
};
