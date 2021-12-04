import styled from '@emotion/styled';
import React from 'react';

interface PathProps extends React.ComponentProps<'path'> {
  color?: string;
}

const StyledPath = styled.path<PathProps>`
  ${({ color }) => color && `fill: ${color};`}
`;

export default StyledPath;
