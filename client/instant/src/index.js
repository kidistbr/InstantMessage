import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { AuthContextProvider } from './context/AuthContext'
import { StyledEngineProvider } from '@mui/material/styles'

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StyledEngineProvider>,
  document.getElementById('root'),
)

reportWebVitals()
