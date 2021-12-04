import React from 'react';
import { Colors, FontSize } from '@/styles';
import styled from '@emotion/styled';

type SvgType = React.ComponentProps<'svg'>;

const StyledSvg = styled.svg<SvgType>`
  width: ${FontSize.small};
  height: auto;
`;

interface Props extends React.ComponentProps<'svg'> {
  color?: string;
}

const Edit = ({ ...props }: Props): JSX.Element => {
  return (
    <StyledSvg
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.85424 4.12186L7.4244 4.75178L1.80962 10.9551H1.23947V10.3252L6.85424 4.12186ZM9.08528 0C8.93035 0 8.76922 0.0684694 8.65147 0.198561L7.51736 1.45155L9.84136 4.01915L10.9755 2.76616C11.2172 2.49913 11.2172 2.06778 10.9755 1.80075L9.52529 0.198561C9.40135 0.0616224 9.24641 0 9.08528 0ZM6.85424 2.18417L0 9.75689V12.3245H2.324L9.17824 4.75178L6.85424 2.18417Z"
        fill={Colors.textSecondary}
      />
    </StyledSvg>
  );
};

export default Edit;
