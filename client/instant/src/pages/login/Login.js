
import { useContext, useRef, useState, useEffect } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import Alert from '@mui/material/Alert';


export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching,error, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.state); // result: 'some_value'
 }, [location]);

  // const { responseMsg, setResponseMsg } = useState(response);

  // useEffect(() => {
  //   setResponseMsg(response.messag);
  // }, [response]);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  const handleRegistrationClick = ()=>{
    history.push('/register')
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Instant Message App</h3>
          <span className="loginDesc">
            Connect with friends using Instant Message App.
          </span>
        </div>
        <div className="loginRight">
          {location.state?
          <Alert severity="info">{location.state.response}</Alert>
            :
            <div></div>
        }
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
                "Log In"
              )}
            </button>

          </form>
          <form  className="loginBox" onSubmit={handleRegistrationClick}>

          <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
            </form>
        </div>
      </div>
    </div>
  );
}
