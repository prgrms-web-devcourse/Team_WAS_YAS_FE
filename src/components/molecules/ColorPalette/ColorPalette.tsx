import { Colors, Media } from '@/styles';
import React, { ChangeEvent, useState } from 'react';
import ColorItem, { ColorItemProps } from './ColorItem';
import styled from '@emotion/styled';

export interface ColorPaletteProps {
  color?: Pick<ColorItemProps, 'color'>;
  colors: string[];
  name: string;
  onChange: (selectedColor: string) => void;
  initialSelectedColor?: string;
}

const ColorPalette = ({
  color,
  name,
  colors,
  onChange,
  initialSelectedColor,
  ...props
}: ColorPaletteProps): JSX.Element => {
  const [selectedColor, setSelectedColor] = useState<string>(
    initialSelectedColor ? initialSelectedColor : '',
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setSelectedColor(color);
    onChange && onChange(color);
  };
  return (
    <StyledColorPalette>
      {colors &&
        colors.map((color) => (
          <ColorItem
            color={color}
            name="color"
            onChange={handleChange}
            key={color}
            checked={selectedColor === color}
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
  place-items: center;
  @media ${Media.sm} {
    height: 74px;
  }
  @media ${Media.md} {
    height: 128px;
  }
  @media ${Media.lg} {
    height: 128px;
  }
`;

export default ColorPalette;
