import { Media } from '@/styles';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import Base from './Base';

interface PlayButtonProps extends React.ComponentProps<'button'> {
  onPlayClick?: () => void;
}

const Play = ({ onPlayClick, ...props }: PlayButtonProps): JSX.Element => {
  const [isPlay, setIsPlay] = useState<boolean>(true);

  const handleClickPlayButton = (): void => {
    setIsPlay((isPlay) => !isPlay);
    onPlayClick && onPlayClick();
  };

  return (
    <PlayBase onClick={handleClickPlayButton} {...props}>
      {isPlay ? (
        <Svg viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 0H3C2.20435 0 1.44129 0.31607 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V27C0 27.7956 0.316071 28.5587 0.87868 29.1213C1.44129 29.6839 2.20435 30 3 30H6C6.79565 30 7.55871 29.6839 8.12132 29.1213C8.68393 28.5587 9 27.7956 9 27V3C9 2.20435 8.68393 1.44129 8.12132 0.87868C7.55871 0.31607 6.79565 0 6 0Z"
            fill="#676767"
          />
          <path
            d="M21 0H18C17.2044 0 16.4413 0.31607 15.8787 0.87868C15.3161 1.44129 15 2.20435 15 3V27C15 27.7956 15.3161 28.5587 15.8787 29.1213C16.4413 29.6839 17.2044 30 18 30H21C21.7956 30 22.5587 29.6839 23.1213 29.1213C23.6839 28.5587 24 27.7956 24 27V3C24 2.20435 23.6839 1.44129 23.1213 0.87868C22.5587 0.31607 21.7956 0 21 0Z"
            fill="#676767"
          />
        </Svg>
      ) : (
        <Svg viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.7869 15.5913L3.69882 26.6667C2.0789 27.6057 0 26.4687 0 24.5758V2.42492C0 0.535018 2.0759 -0.604927 3.69882 0.337027L22.7869 11.4125C23.1554 11.6228 23.4617 11.9269 23.6747 12.2939C23.8878 12.6608 24 13.0776 24 13.5019C24 13.9262 23.8878 14.343 23.6747 14.7099C23.4617 15.0768 23.1554 15.3809 22.7869 15.5913Z"
            fill="#565656"
          />
        </Svg>
      )}
    </PlayBase>
  );
};

const PlayBase = styled(Base)`
  @media ${Media.sm} {
    width: 3rem;
    height: 3rem;
  }
`;

const Svg = styled.svg`
  height: auto;
  @media ${Media.sm} {
    width: 1.125rem;
  }
  @media ${Media.md} {
    width: 1.5rem;
  }
  @media ${Media.lg} {
    width: 1.5rem;
  }
`;

export default Play;
