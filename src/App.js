import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Users from './screen/users'
import AddUser from './screen/addUser'

function App() {
  return (


    <Router>
      <div className="container">
        <Switch>
          <Route path="/adduser" component={AddUser} />
          <Route path="/" component={Users} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
