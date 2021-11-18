import logo from './logo.svg'

import Register from './pages/register/Register'
import { AuthContext } from './context/AuthContext'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useContext } from 'react'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { initialize } from '../src/utils/talk.session'

function App() {
  const { user } = useContext(AuthContext)

  if (user) {
    initialize(user)
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messaging">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
