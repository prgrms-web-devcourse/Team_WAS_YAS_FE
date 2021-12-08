import { EmojiPicker } from '@/components/organisms/EmojiPicker';
import { EmojiPickerProps } from '@/components/organisms/EmojiPicker/EmojiPicker';
import { useState } from 'react';

export default {
  title: 'Components/Organisms/EmojiPicker',
  component: EmojiPicker,
};

export const Default = ({
  onEmojiClick,
  ...args
}: EmojiPickerProps): JSX.Element => {
  const [emoji, setEmoji] = useState<string>('');
  const handleEmoji = (selectedEmoji: string) => {
    setEmoji(selectedEmoji);
  };
  return (
    <>
      <EmojiPicker onEmojiClick={handleEmoji} {...args} />
      <div>{emoji}</div>
    </>
  );
};
