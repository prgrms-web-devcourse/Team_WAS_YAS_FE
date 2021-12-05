import { useState } from 'react';
import { DeleteBox } from '@/components';

export default {
  title: 'Components/Molecules/ToolBox/DeleteBox',
  component: DeleteBox,
  argTypes: {
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

  return (
    <>
      <button onClick={() => setVisible(true)}>Show DeleteBox</button>
      <DeleteBox
        visible={visible}
        onClose={handleCloseDeleteBox}
        onClickDeleteButton={handleClickDeleteButton}
      />
    </>
  );
};
