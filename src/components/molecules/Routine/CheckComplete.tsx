import { Media } from '@/styles';
import styled from '@emotion/styled';
import { Fragment } from 'react';

const CheckComplete = ({ completed }: { completed: boolean }): JSX.Element => {
  return (
    <Fragment>
      {completed ? (
        <Svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
            stroke="white"
            strokeWidth="2"
          />
        </Svg>
      ) : (
        <Svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 11.5L10 14.5L15 8.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
            stroke="white"
            strokeWidth="2"
          />
        </Svg>
      )}
    </Fragment>
  );
};

const Svg = styled.svg`
  @media ${Media.sm} {
    width: 0.875rem;
    height: 0.875rem;
  }
  @media ${Media.md} {
    width: 1.5rem;
    height: 1.5rem;
  }
  @media ${Media.lg} {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default CheckComplete;
