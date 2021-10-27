
import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";


export default function Login() {
  const Username = useRef();
  const Password = useRef();
  const { isFetching,error, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { Username: Username.current.value, Password: Password.current.value },
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
          <form className="loginBox" onSubmit={handleClick}>
      
                        <input
              placeholder="Username"
              type="Username"
              required
              className="loginInput"
              ref={Username}
            />
            <input
              placeholder="Password"
              type="Password"
              required
              minLength="6"
              className="loginInput"
              ref={Password}
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
