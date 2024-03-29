import { useContext, useRef, useEffect } from 'react'
import './login.css'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@material-ui/core'
import { useHistory } from 'react-router'
import { useLocation } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import logo from './../../logo.png'
import image from './../../walpaper.webp'

export default function Login() {
  const email = useRef()
  const password = useRef()
  const { isFetching, dispatch } = useContext(AuthContext)
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    console.log(location.pathname)
    console.log(location.state)
  }, [location])

  const handleClick = (e) => {
    e.preventDefault()
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch,
    )
  }

  const handleRegistrationClick = () => {
    history.push('/register')
  }

  return (
    <div
      className="login"
      style={{
        backgroundImage: 'url(' + image + ')',
        backgroundSize: 'cover',
        height: '100vh',
        color: '#f5f5f5',
      }}
    >
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">CreoChat</h3>
          <span className="loginDesc">Connect with your team mates.</span>
        </div>
        <div className="loginRight">
          <img src={logo} className="App-logo" alt="logo" />

          {location.state ? (
            <Alert severity="info">{location.state.response}</Alert>
          ) : (
            <div></div>
          )}
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                'Log In'
              )}
            </button>
          </form>
          <form className="loginBox" onSubmit={handleRegistrationClick}>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                'Create a New Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
