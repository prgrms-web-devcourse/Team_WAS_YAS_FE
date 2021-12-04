export const FontSize = {
  micro: `0.75rem`,
  small: `0.875rem`,
  base: `1rem`,
  medium: `1.125rem`,
  large: `1.5rem`,
};

export const FontWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
};

export const FontStyle = {
  micro: (): string => `
  font-size: 0.75rem;
  line-height: 16px;
  letter-spacing: -0.005em;
  `,
  small: (): string => `
  font-size: 0.875rem;
  line-height: 24px;
  letter-spacing: -0.01em;
  `,
  base: (): string => `
  font-size: 1rem;
  line-height: 24px;
  letter-spacing: -0.01em;
  `,
  medium: (): string => `
  font-size: 1.125rem;
  line-height: 28px;
  letter-spacing: -0.02em;
  `,
  large: (): string => `
  font-size: 1.5rem;
  line-height: 34px;
  letter-spacing: -0.01em;
  `,
};
