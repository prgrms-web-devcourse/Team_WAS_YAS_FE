import './index.css';
import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

addDecorator((story) => (
  <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
));

const customViewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '320px',
      height: '100%',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '100%',
    },
  },
  pc: {
    name: 'PC',
    styles: {
      width: '1920px',
      height: '100%',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports },
};
