import React from 'react';
import { Colors, Media } from '@/styles';
import styled from '@emotion/styled';

type SvgProps = React.ComponentProps<'svg'>;

const StyledSvg = styled.svg<SvgProps>`
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

const ArrowForward = ({ ...props }: SvgProps): JSX.Element => {
  return (
    <StyledSvg
      viewBox="0 0 38 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.83018 58.4678C0.268082 60.0299 0.268086 62.5625 1.83019 64.1246L2.22184 64.5163C3.78394 66.0784 6.3166 66.0784 7.8787 64.5163L36.3942 36.0008C37.9563 34.4387 37.9563 31.906 36.3942 30.3439L7.8787 1.82837C6.31661 0.266278 3.78395 0.266278 2.22185 1.82837L1.83019 2.22004C0.268091 3.78214 0.268091 6.31479 1.83019 7.87689L24.2972 30.3439C25.8593 31.906 25.8593 34.4387 24.2972 36.0008L1.83018 58.4678Z"
        fill={Colors.textSecondary}
      />
    </StyledSvg>
  );
};

export default ArrowForward;
