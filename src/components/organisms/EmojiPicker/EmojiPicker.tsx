import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { Button } from '@/components';
import styled from '@emotion/styled';

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
    <EmojiPickerContainer {...props}>
      <Button onClick={toggleEmojiPicker}>선택하기</Button>
      {showEmojiPicker && (
        <PickerContainer>
          <Picker
            onEmojiClick={handleEmojiClick}
            pickerStyle={{ width: '100%' }}
          />
        </PickerContainer>
      )}
    </EmojiPickerContainer>
  );
};

export default EmojiPicker;

const EmojiPickerContainer = styled.div`
  width: 100%;
  position: relative;
`;

const PickerContainer = styled.div`
  position: absolute;
  z-index: 2;
`;
