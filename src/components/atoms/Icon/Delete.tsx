import { Colors, FontSize } from '@/styles';
import styled from '@emotion/styled';
import { IconProps } from './Icon';

const Delete = ({ color, size, ...props }: IconProps): JSX.Element => {
  return (
    <StyledSvg
      size={size}
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 3.33333H1.33333V12C1.33333 12.3536 1.47381 12.6928 1.72386 12.9428C1.97391 13.1929 2.31304 13.3333 2.66667 13.3333H9.33333C9.68696 13.3333 10.0261 13.1929 10.2761 12.9428C10.5262 12.6928 10.6667 12.3536 10.6667 12V3.33333H2ZM4.66667 11.3333H3.33333V5.33333H4.66667V11.3333ZM8.66667 11.3333H7.33333V5.33333H8.66667V11.3333ZM9.07867 1.33333L8 0H4L2.92133 1.33333H0V2.66667H12V1.33333H9.07867Z"
        fill={color}
      />
    </StyledSvg>
  );
};

Delete.defaultProps = {
  color: Colors.textSecondary,
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
        width: ${FontSize.small};
        height: auto;
      `;
    }
  }}
`;

export default Delete;
