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
import Register from "./pages/register/Register"



function App() {
  return (
    <Register></Register>
    
    // <Router>
    //   <Switch>
    //     <Route exact path="/">
    //       {user ? <Home /> : <Register />}
    //     </Route>
    //     <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
    //     <Route path="/register">
    //       {user ? <Redirect to="/" /> : <Register />}
    //     </Route>
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
