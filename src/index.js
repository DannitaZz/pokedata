import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { checkValue } from './utils'

const appName = 'pokedata'
const version = '0.1'
const realUser = 'ash_ketchum'
const realPass = 'pikachu123'
checkValue('appName', appName)
checkValue('version', version)
localStorage.setItem('appName', appName)
localStorage.setItem('version', version)
localStorage.setItem('realUser', 'ash_ketchum')
localStorage.setItem('realPass', 'pikachu123')

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF1C1C'
    },
    secondary: {
      main: '#f50057',
    },
    /* text: {
      primary: 'rgba(243,239,239,0.87)',
      secondary: 'rgba(212,210,210,0.54)',
      disabled: 'rgba(131,131,131,0.38)',
      hint: 'rgba(127,127,127,0.38)',
    }, */
  },
}
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
