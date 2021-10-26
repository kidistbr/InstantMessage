    import axios from 'axios'
    import { useRef } from 'react'
    import './register.css'
    import { useHistory } from "react-router";

    export default function Register() {
    const Username = useRef()
    const email = useRef()
    const Password = useRef()
    const passwordAgain = useRef()
    const Name = useRef()
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault()
        if (passwordAgain.current.value !== Password.current.value) {
        passwordAgain.current.setCustomValidity("Passwords don't match!")
        } else {
        const user = {
            Username: Username.current.value,
            email: email.current.value,
            Password: Password.current.value,
            Name: Name.current.value,
        }
        try {
            console.log(user)
            await axios.post('http://localhost:3000/api/users/register', user)
            history.push("/login")
            ;
        } catch (err) {
            console.log(err)
        }
        
        }
    }

    return (
        <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
            <h3 className="loginLogo">Instant Message App</h3>
            <span className="loginDesc">
                Connect with people using the Instant Message App.
            </span>
            </div>
            <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <input
                placeholder="Username"
                required
                ref={Username}
                className="loginInput"
                />
                <input
                placeholder="Name"
                required
                ref={Name}
                className="loginInput"
                type="name"
                />
                <input
                placeholder="Email"
                required
                ref={email}
                className="loginInput"
                type="email"
                />
                <input
                placeholder="Password"
                required
                ref={Password}
                className="loginInput"
                type="password"
                minLength="6"
                />
                <input
                placeholder="Password Again"
                required
                ref={passwordAgain}
                className="loginInput"
                type="password"
                />
                <button className="loginButton" type="submit">
                Sign Up
                </button>
                <button className="loginRegisterButton">Log into Account</button>
            </form>
            </div>
        </div>
        </div>
    )
    }
