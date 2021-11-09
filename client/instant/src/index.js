import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from "./context/AuthContext" 
import { StyledEngineProvider } from '@mui/material/styles';

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
</StyledEngineProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
