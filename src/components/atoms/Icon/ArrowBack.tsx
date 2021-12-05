import styled from '@emotion/styled';
import { Colors, Media } from '@/styles';
import { IconProps } from './Icon';

const ArrowBack = ({ color, size, ...props }: IconProps): JSX.Element => {
  return (
    <StyledSvg
      size={size}
      viewBox="0 0 38 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M36.3925 7.87694C37.9546 6.31484 37.9546 3.78218 36.3925 2.22008L36.0008 1.82842C34.4387 0.266328 31.9061 0.26633 30.344 1.82843L1.82843 30.344C0.266331 31.9061 0.26633 34.4387 1.82843 36.0008L30.344 64.5163C31.9061 66.0784 34.4387 66.0784 36.0008 64.5163L36.3925 64.1247C37.9546 62.5626 37.9546 60.0299 36.3925 58.4678L13.9255 36.0008C12.3634 34.4387 12.3634 31.9061 13.9255 30.344L36.3925 7.87694Z"
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
