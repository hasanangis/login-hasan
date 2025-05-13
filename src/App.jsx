
import './App.css'
import Login from "./Components/Login"
import Success from "./Components/Success"

import { Switch, Route } from 'react-router-dom'
function App() {
  return (
    <>
    <Switch>
    <Route path="/" exact>
    <Login />
    </Route>
    <Route path="success">
      <Success />
    </Route>
    
    </Switch>
    </>
  )
};

export default App

