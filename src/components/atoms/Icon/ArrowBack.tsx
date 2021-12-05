import styled from '@emotion/styled';
import { Colors, Media } from '@/styles';
import { IconProps } from './Icon';

const ArrowBack = ({ color, size, ...props }: IconProps): JSX.Element => {
  return (
    <StyledSvg
      size={size}
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.37421 11.25C5.26216 11.2503 5.15146 11.2256 5.05022 11.1776C4.94899 11.1296 4.8598 11.0595 4.78921 10.9725L1.16671 6.47246C1.0564 6.33826 0.996094 6.16993 0.996094 5.99621C0.996094 5.82249 1.0564 5.65416 1.16671 5.51996L4.91671 1.01996C5.04401 0.8668 5.22695 0.770482 5.42527 0.752197C5.62359 0.733912 5.82105 0.795159 5.97421 0.922463C6.12737 1.04977 6.22369 1.2327 6.24197 1.43102C6.26026 1.62934 6.19901 1.8268 6.07171 1.97996L2.71921 5.99996L5.95921 10.02C6.05092 10.1301 6.10918 10.2641 6.12709 10.4063C6.145 10.5484 6.12181 10.6927 6.06027 10.8221C5.99873 10.9515 5.90141 11.0606 5.77982 11.1364C5.65824 11.2122 5.51749 11.2516 5.37421 11.25Z"
        fill={color}
      />
    </StyledSvg>
  );
};

const StyledSvg = styled.svg<IconProps>`
  ${({ size }) => {
    if (size) {
      return `
        width: ${size}px;
        height: auto;
      `;
    } else {
      return `
        @media ${Media.sm} {
          width: 2rem;
          height: 2rem;
        }
        @media ${Media.md} {
          width: 4rem;
          height: 4rem;
        }
        @media ${Media.lg} {
          width: 4rem;
          height: 4rem;
        }
      `;
    }
  }}
`;

ArrowBack.defaultProps = {
  color: Colors.textSecondary,
};

export default ArrowBack;
