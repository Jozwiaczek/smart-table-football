import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { useTheme } from '@material-ui/core/styles';

const SCGlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
      'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    background-color: ${({ theme }) => theme.palette.background.default};
  }
  
  body::-webkit-scrollbar {
    width: 0.4rem;
  }
  
  body::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.background.paper};
  }
  
  body::-webkit-scrollbar-thumb {
    background: #ff9800;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;

const GlobalStyles = () => {
  const theme = useTheme();

  return <SCGlobalStyles theme={theme} />;
};

export default GlobalStyles;
