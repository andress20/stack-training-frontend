import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
}
from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/Dashboard' component={Dashboard}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
