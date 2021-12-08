import { EmojiPicker, EmojiPickerProps } from '@/components';
import { useCallback, useState } from 'react';

export default {
  title: 'Components/Organisms/EmojiPicker',
  component: EmojiPicker,
};

export const Default = ({
  onEmojiClick,
  ...args
}: EmojiPickerProps): JSX.Element => {
  const [emoji, setEmoji] = useState<string>('');
  const handleEmoji = useCallback((selectedEmoji: string) => {
    setEmoji(selectedEmoji);
  }, []);
  return (
    <>
      <EmojiPicker onEmojiClick={handleEmoji} {...args} />
      <div>{emoji}</div>
    </>
  );
};
