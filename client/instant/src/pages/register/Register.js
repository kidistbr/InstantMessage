import axios from 'axios'
import { useRef } from 'react'
import './register.css'
import { useHistory } from 'react-router'
import Alert from '@mui/material/Alert'
import { useState } from 'react'
import logo from './../../logo.png'
import image from './../../walpaper.webp'

export default function Register() {
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()
  const firstName = useRef()
  const lastName = useRef()
  const history = useHistory()
  const [responseMsg, setResponseMsg] = useState()

  const handleClick = async (e) => {
    e.preventDefault()
    console.log('passwordAgain.current.value', passwordAgain.current.value)
    console.log('password.current.value', password.current.value)
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!")
    } else {
      const user = {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        console.log(user)
        const response = await axios.post(
          'http://localhost:3001/api/users/register',
          user,
        )
        console.log(response)
        setResponseMsg(response.data.message)
        history.push({
          pathname: '/login',
          state: {
            response: 'Successfully Registered. Please Log in.',
          },
        })
      } catch (err) {
        setResponseMsg(err.response.data)
        console.log('err', err)
      }
    }
  }
  const handleLoginToAccount = () => {
    history.push('/login')
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

          {responseMsg ? (
            <Alert severity="warning">{responseMsg}</Alert>
          ) : (
            <div></div>
          )}
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="First Name"
              required
              ref={firstName}
              className="loginInput"
              type="name"
            />
            <br />
            <input
              placeholder="Last Name"
              required
              ref={lastName}
              className="loginInput"
              type="name"
            />
            <br />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <br />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <br />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />{' '}
            <br />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
          </form>
          <form className="loginBox" onSubmit={handleLoginToAccount}>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  )
}
