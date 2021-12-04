import { media } from '@/styles';
import styled from '@emotion/styled';
import Base, { ButtonProps } from '@/components/atoms/Button/Base';

const Analysis = ({ active, ...props }: ButtonProps): JSX.Element => {
  return (
    <Base {...props}>
      {active ? (
        <Svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M32 0H3.98C1.78 0 0 1.8 0 4L0.02 32C0.02 34.2 1.8 36 4 36H24L36 24V4C36 1.8 34.2 0 32 0ZM10 10H26C27.1 10 28 10.9 28 12C28 13.1 27.1 14 26 14H10C8.9 14 8 13.1 8 12C8 10.9 8.9 10 10 10ZM16 22H10C8.9 22 8 21.1 8 20C8 18.9 8.9 18 10 18H16C17.1 18 18 18.9 18 20C18 21.1 17.1 22 16 22ZM22 33V24C22 22.9 22.9 22 24 22H33L22 33Z"
            fill="#4859A4"
          />
        </Svg>
      ) : (
        <Svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M32 0H3.98C1.78 0 0 1.8 0 4L0.02 32C0.02 34.2 1.8 36 4 36H24L36 24V4C36 1.8 34.2 0 32 0ZM10 10H26C27.1 10 28 10.9 28 12C28 13.1 27.1 14 26 14H10C8.9 14 8 13.1 8 12C8 10.9 8.9 10 10 10ZM16 22H10C8.9 22 8 21.1 8 20C8 18.9 8.9 18 10 18H16C17.1 18 18 18.9 18 20C18 21.1 17.1 22 16 22ZM22 33V24C22 22.9 22.9 22 24 22H33L22 33Z"
            fill="#BEC6E4"
          />
        </Svg>
      )}
    </Base>
  );
};

const Svg = styled.svg`
  @media ${media.sm} {
    width: 22.5px;
    height: 22.5px;
  }
  @media ${media.md} {
    width: 36px;
    height: 36px;
  }
  @media ${media.lg} {
    width: 36px;
    height: 36px;
  }
`;

Analysis.defaultProps = {
  active: false,
};

export default Analysis;
