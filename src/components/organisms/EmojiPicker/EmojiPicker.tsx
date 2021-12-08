import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { Button } from '@/components';

export interface EmojiPickerProps extends React.ComponentProps<'div'> {
  onEmojiClick: (emoji: string) => void;
}

const EmojiPicker = ({
  onEmojiClick,
  ...props
}: EmojiPickerProps): JSX.Element => {
  const [showEmojiPicker, toggled] = useState<boolean>(false);
  const toggleEmojiPicker = () => toggled((prev) => !prev);
  const handleEmojiClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    EmojiObject: any & { emoji: string },
  ): void => {
    onEmojiClick && onEmojiClick(EmojiObject.emoji);
    toggleEmojiPicker();
  };

  return (
    <div {...props}>
      <Button onClick={toggleEmojiPicker}>선택하기</Button>
      {showEmojiPicker && (
        <Picker
          onEmojiClick={handleEmojiClick}
          pickerStyle={{ width: '100%' }}
        />
      )}
    </div>
  );
};

export default EmojiPicker;
