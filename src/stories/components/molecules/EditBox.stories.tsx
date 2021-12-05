import { useState } from 'react';
import { EditBox } from '@/components';

export default {
  title: 'Components/Molecules/ToolBox/EditBox',
  component: EditBox,
  argTypes: {
    onClickUpdateButton: { action: 'clicked' },
    onClickDeleteButton: { action: 'clicked' },
  },
};

export const Default = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleCloseDeleteBox = () => {
    setVisible(false);
  };

  const handleClickDeleteButton = () => {
    console.log('clicked delete button');
  };

  const handleClickUpdateButton = () => {
    console.log('clicked update button');
  };

  return (
    <>
      <button onClick={() => setVisible(true)}>Show EditBox</button>
      <EditBox
        visible={visible}
        onClose={handleCloseDeleteBox}
        onClickUpdateButton={handleClickUpdateButton}
        onClickDeleteButton={handleClickDeleteButton}
      />
    </>
  );
};
