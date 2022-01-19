import { Modal, Text } from '@/components';
import EmotionPicker from './EmotionPicker';
import { Colors, FontSize } from '@/styles';
import styled from '@emotion/styled';
import { EMOTION } from '@/constants';
import { ChangeEvent, useState } from 'react';

export interface ReviewProps {
  visible: boolean;
  onClose?: () => void;
  onChange?: (emotion: string) => void;
}

const RoutineReviewModal = ({
  visible,
  onClose,
  onChange,
}: ReviewProps): JSX.Element => {
  const emotionList = Object.keys(EMOTION);
  const [selectedEmotion, setSelectedEmotion] = useState<string>('1');

  const handleEmotionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const emotion = e.target.value;
    setSelectedEmotion(emotion);
    onChange && onChange(emotion);
  };

  return (
    <StyledModal visible={visible} onClose={onClose}>
      <Text color={Colors.textPrimary} fontSize={FontSize.medium}>
        오늘의 루틴은 어떠셨나요?
      </Text>
      <EmotionContainer>
        {emotionList.map((emotion: string) => (
          <EmotionPicker
            emotion={emotion}
            key={emotion}
            onChange={handleEmotionChange}
            checked={selectedEmotion === emotion}
          />
        ))}
      </EmotionContainer>
    </StyledModal>
  );
};

export default RoutineReviewModal;

const StyledModal = styled(Modal)`
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmotionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
