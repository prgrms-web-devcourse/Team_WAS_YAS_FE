import { media } from '@/styles';
import styled from '@emotion/styled';
import Base, { ButtonProps } from '@/components/atoms/Button/Base';

const Add = ({ ...props }: ButtonProps): JSX.Element => {
  return (
    <PlayBase {...props}>
      <Svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M29.4016 15.0001C29.4016 16.3273 29.2864 17.4001 27.9592 17.4001H17.4016V27.9577C17.4016 29.2825 16.3288 29.4001 15.0016 29.4001C13.6744 29.4001 12.6016 29.2825 12.6016 27.9577V17.4001H2.04396C0.719162 17.4001 0.601562 16.3273 0.601562 15.0001C0.601562 13.6729 0.719162 12.6001 2.04396 12.6001H12.6016V2.0425C12.6016 0.715297 13.6744 0.600098 15.0016 0.600098C16.3288 0.600098 17.4016 0.715297 17.4016 2.0425V12.6001H27.9592C29.2864 12.6001 29.4016 13.6729 29.4016 15.0001Z"
          fill="#7B7B7B"
        />
      </Svg>
    </PlayBase>
  );
};

const PlayBase = styled(Base)`
  @media ${media.sm} {
    border-radius: 50%;
  }
  @media ${media.md} {
    border-radius: 50%;
  }
  @media ${media.lg} {
    border-radius: 50%;
  }
`;

const Svg = styled.svg`
  @media ${media.sm} {
    width: 18px;
    height: 18px;
  }
  @media ${media.md} {
    width: 30px;
    height: 30px;
  }
  @media ${media.lg} {
    width: 30px;
    height: 30px;
  }
`;

export default Add;
