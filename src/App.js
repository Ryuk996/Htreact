import logo from './logo.svg';
import './App.css';
import Login from './login';
import Register from './Register';
import Drive from './Drive';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/register" component={Register} exact={true}/>
      <Route path="/login" component={Login} exact={true}/>
      <Route path="/drive" component={Drive} exact={true}/>
    </Switch>

  </Router>
  );
}

export default App;
