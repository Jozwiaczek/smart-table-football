import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { defaultThemeProvider } from '../src';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={defaultThemeProvider()}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
};
