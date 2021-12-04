import styled from '@emotion/styled';
import React from 'react';
import { Colors } from '@/styles';

type SvgType = React.ComponentProps<'svg'>;

interface SvgProps extends SvgType {
  size?: number;
}

const StyledSvg = styled.svg<SvgProps>`
  ${({ size }) => size && `width: ${size}px; height: ${size}px;`}
`;

interface Props extends SvgProps {
  size?: number;
  color?: string;
}

const ArrowBack = ({ size, color, ...props }: Props): JSX.Element => {
  return (
    <StyledSvg
      size={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.3742 14.25C10.2622 14.2503 10.1515 14.2256 10.0502 14.1776C9.94899 14.1296 9.8598 14.0595 9.78921 13.9725L6.16671 9.47246C6.0564 9.33826 5.99609 9.16993 5.99609 8.99621C5.99609 8.82249 6.0564 8.65416 6.16671 8.51996L9.91671 4.01996C10.044 3.8668 10.2269 3.77048 10.4253 3.7522C10.6236 3.73391 10.821 3.79516 10.9742 3.92246C11.1274 4.04977 11.2237 4.2327 11.242 4.43102C11.2603 4.62934 11.199 4.8268 11.0717 4.97996L7.71921 8.99996L10.9592 13.02C11.0509 13.1301 11.1092 13.2641 11.1271 13.4063C11.145 13.5484 11.1218 13.6927 11.0603 13.8221C10.9987 13.9515 10.9014 14.0606 10.7798 14.1364C10.6582 14.2122 10.5175 14.2516 10.3742 14.25Z"
        fill={color}
      />
    </StyledSvg>
  );
};

ArrowBack.defaultProps = {
  size: 18,
  color: Colors.textSecondary,
};

export default ArrowBack;
