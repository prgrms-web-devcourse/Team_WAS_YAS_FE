import styled from '@emotion/styled';
import React from 'react';

interface SvgProps extends React.ComponentProps<'svg'> {
  size?: number;
}

const StyledSvg = styled.svg<SvgProps>`
  ${({ size }) => size && `width: ${size}px; height: ${size}px;`}
`;

export default StyledSvg;
