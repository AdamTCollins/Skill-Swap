// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Segoe UI', 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
  }
`;

export default GlobalStyles;