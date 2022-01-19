import { EMOTION } from '@/constants';
import { Media } from '@/styles';
import styled from '@emotion/styled';
import React from 'react';

export interface EmotionPickerProps extends React.ComponentProps<'input'> {
  emotion: string;
}

const EmotionPicker = ({
  emotion,
  ...props
}: EmotionPickerProps): JSX.Element => {
  return (
    <>
      <Input
        type="radio"
        id={emotion}
        name="emotion"
        value={emotion}
        {...props}
      />
      <label htmlFor={emotion}>
        <Image src={EMOTION[emotion]} alt="emotionImg" />
      </label>
    </>
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
    width: 32px;
    height: 32px;
  }
  @media ${Media.md} {
    width: 48px;
    height: 48px;
  }
  @media ${Media.lg} {
    width: 48px;
    height: 48px;
  }
  margin: 0.5rem;
  cursor: pointer;
`;
