import { isQiankun, ROOT_NAME } from '@/constants';
import React from 'react';
import { StyleSheetManager, ThemeProvider as StyledThemeProvider } from 'styled-components';
import extraScopePlugin from 'stylis-plugin-extra-scope';

Object.defineProperty(extraScopePlugin, '#dummy-id', {
  value: ROOT_NAME,
});

interface Props {
  children: any;
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const stylisPlugins = [extraScopePlugin('#dummy-id', `#${ROOT_NAME}`)];

  return (
    <StyleSheetManager stylisPlugins={stylisPlugins} disableCSSOMInjection={isQiankun}>
      <StyledThemeProvider theme={{}}>{children}</StyledThemeProvider>
    </StyleSheetManager>
  );
};

export default ThemeProvider;
