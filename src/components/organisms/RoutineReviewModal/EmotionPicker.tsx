import { EMOTION } from '@/constants';
import { Media } from '@/styles';
import styled from '@emotion/styled';
import React, { ChangeEvent, Fragment, useState } from 'react';

export interface EmotionPickerProps {
  emotion?: string;
  onChange: (emotion: string) => void;
}

const EmotionPicker = ({
  emotion,
  onChange,
  ...props
}: EmotionPickerProps): JSX.Element => {
  const emotionList = Object.keys(EMOTION);
  const [selectedEmotion, setSelectedEmotion] = useState<string>('1');
  const handleEmotionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedEmotion(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <EmotionContainer>
      {emotionList.map((emotion: string) => (
        <Fragment key={emotion}>
          <Input
            type="radio"
            id={emotion}
            name="emotion"
            value={emotion}
            onChange={handleEmotionChange}
            checked={selectedEmotion === emotion}
            {...props}
          />
          <label htmlFor={emotion}>
            <Image src={EMOTION[emotion]} alt="emotionImg" />
          </label>
        </Fragment>
      ))}
    </EmotionContainer>
  );
};

export default EmotionPicker;

const Input = styled.input`
  display: none;
  :checked + label > img {
    opacity: 0.4;
  }
`;

const Image = styled.img`
  @media ${Media.sm} {
    width: 28px;
    height: 28px;
    margin: 0.6rem;
  }
  @media ${Media.md} {
    width: 48px;
    height: 48px;
    margin: 0.8rem;
  }
  @media ${Media.lg} {
    width: 48px;
    height: 48px;
    margin: 0.8rem;
  }
  cursor: pointer;
`;

const EmotionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
