import React from 'react';
import { Colors, Media, FontSize } from '@/styles';
import styled from '@emotion/styled';

type SvgType = React.ComponentProps<'svg'>;

const StyledSvg = styled.svg<SvgType>`
  @media ${Media.sm} {
    width: ${FontSize.base};
    height: ${FontSize.base};
  }
  @media ${Media.md} {
    width: ${FontSize.large};
    height: ${FontSize.large};
  }
  @media ${Media.lg} {
    width: ${FontSize.large};
    height: ${FontSize.large};
  }
`;

interface Props extends React.ComponentProps<'svg'> {
  color?: string;
}

const Close = ({ ...props }: Props): JSX.Element => {
  return (
    <StyledSvg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.9857 0L10 7.98571L2.01429 0L0 2.01429L7.98571 10L0 17.9857L2.01429 20L10 12.0143L17.9857 20L20 17.9857L12.0143 10L20 2.01429L17.9857 0Z"
        fill={Colors.textSecondary}
      />
    </StyledSvg>
  );
};

export default Close;
