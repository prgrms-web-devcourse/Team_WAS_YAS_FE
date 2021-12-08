import { ColorPalette, ColorPaletteProps } from '@/components';

export default {
  title: 'Components/Molecules/ColorPalette',
  component: ColorPalette,
  argTypes: {
    onChange: { actions: 'onChange' },
  },
};

export const Default = ({ ...args }: ColorPaletteProps): JSX.Element => {
  return (
    <>
      <ColorPalette {...args} />
    </>
  );
};
