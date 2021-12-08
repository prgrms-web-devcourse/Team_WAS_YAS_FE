import { Colors, Media } from '@/styles';
import React, { ChangeEvent } from 'react';
import ColorItem, { ColorItemProps } from './ColorItem';
import styled from '@emotion/styled';

export interface ColorPaletteProps extends ColorItemProps {
  colors: string[];
}

const ColorPalette = ({
  color,
  colors,
  onChange,
  ...props
}: ColorPaletteProps): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };
  return (
    <StyledColorPalette>
      {colors &&
        colors.map((color) => (
          <ColorItem
            color={color}
            onChange={handleChange}
            key={color}
            {...props}
          />
        ))}
    </StyledColorPalette>
  );
};

const defaultProps = {
  colors: Object.values(Colors).slice(2, 16),
};

ColorPalette.defaultProps = defaultProps;

const StyledColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  @media ${Media.sm} {
    width: 284px;
    height: 74px;
  }
  @media ${Media.md} {
    width: 512px;
    height: 128px;
  }
  @media ${Media.lg} {
    width: 512px;
    height: 128px;
  }
`;

export default ColorPalette;
