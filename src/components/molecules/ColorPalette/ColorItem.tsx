import { Colors, Media } from '@/styles';
import styled from '@emotion/styled';
import React from 'react';

export interface ColorItemProps extends React.ComponentProps<'input'> {
  color?: string;
}

const ColorItem = ({ color, ...props }: ColorItemProps): JSX.Element => {
  return (
    <>
      <StyledColorInput
        type="radio"
        id={color}
        name="color"
        value={color}
        {...props}
      />
      <label htmlFor={color}>
        <StyledColorItem color={color} />
      </label>
    </>
  );
};

export default ColorItem;

const StyledColorInput = styled.input`
  display: none;
  :checked + label > div {
    border: 2px solid ${Colors.point};
    opacity: 0.5;
  }
`;
const StyledColorItem = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  @media ${Media.sm} {
    width: 32px;
    height: 32px;
  }
  @media ${Media.md} {
    width: 56px;
    height: 56px;
  }
  @media ${Media.lg} {
    width: 56px;
    height: 56px;
  }
`;
