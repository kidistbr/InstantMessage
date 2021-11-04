// import logo from './logo.svg';
// import './App.css';


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import Register from "./pages/register/Register";
import { AuthContext } from "./context/AuthContext";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import {initialize} from "../src/utils/talk.session"


function App() {
  const { user } = useContext(AuthContext);
  console.log("@@@@@@@",user);

  if (user) {
    initialize(user);
  }


  // console.log("@@@@@@@",user);

  return (
    // <Register></Register>
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}

        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messaging"><Home/></Route>
        </Switch>
        </Router>
    //     <Route path="/messenger">
    //       {!user ? <Redirect to="/" /> : <Messenger />}
    //     </Route>
    //     <Route path="/profile/:username">
    //       <Profile />
    //     </Route>
    //   </Switch>
    // </Router>

    


  );
}

export default App;
