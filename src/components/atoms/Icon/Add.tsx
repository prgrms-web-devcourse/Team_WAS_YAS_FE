import React from 'react';
import { Colors, Media } from '@/styles';
import { IconProps } from './Icon';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Add = ({ color, size, ...props }: IconProps): JSX.Element => {
  return (
    <StyledSvg
      size={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 10C20 10.9217 19.92 11.6667 18.9983 11.6667H11.6667V18.9983C11.6667 19.9183 10.9217 20 10 20C9.07833 20 8.33333 19.9183 8.33333 18.9983V11.6667H1.00167C0.0816664 11.6667 0 10.9217 0 10C0 9.07833 0.0816664 8.33333 1.00167 8.33333H8.33333V1.00167C8.33333 0.0799998 9.07833 0 10 0C10.9217 0 11.6667 0.0799998 11.6667 1.00167V8.33333H18.9983C19.92 8.33333 20 9.07833 20 10Z"
        fill={color}
      />
    </StyledSvg>
  );
};

Add.defaultProps = {
  color: Colors.pointLight,
};

const StyledSvg = styled.svg<IconProps>`
  ${({ size }) => {
    if (size) {
      return `
        width: ${size}px;
        height: auto;
      `;
    } else {
      return css`
        @media ${Media.sm} {
          width: 20px;
          height: 20px;
        }
        @media ${Media.md} {
          width: 24px;
          height: 24px;
        }
        @media ${Media.lg} {
          width: 24px;
          height: 24px;
        }
      `;
    }
  }}
`;

export default Add;
