export const fontSize = {
  micro: `0.75rem`,
  small: `0.875rem`,
  base: `1rem`,
  medium: `1.125rem`,
  large: `1.5rem`,
};

export const fontWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
};

export const fontStyle = {
  micro: () => `
  font-size: 0.75rem;
  line-height: 16px;
  letter-spacing: -0.005em;
  `,
  small: () => `
  font-size: 0.875rem;
  line-height: 24px;
  letter-spacing: -0.01em;
  `,
  base: () => `
  font-size: 1rem;
  line-height: 24px;
  letter-spacing: -0.01em;
  `,
  medium: () => `
  font-size: 1.125rem;
  line-height: 28px;
  letter-spacing: -0.02em;
  `,
  large: () => `
  font-size: 1.5rem;
  line-height: 34px;
  letter-spacing: -0.01em;
  `,
};
