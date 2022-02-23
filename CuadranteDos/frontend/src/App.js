import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

//import NavigationLogin from './components/nav/NavigationLogin'
import Navigation2 from './components/nav/Navigation2'
import Home from './components/home/Home'
import Login from './components/login/Login'
import CreateUser from './components/create/CreateUser'

// Cuadrante Dos
import CreateApunte from './components/create/CreateApunte'
import ApuntesList from './components/list/ApuntesList'

import './App.css';

function App() {
  return (
  <Router>
    <Navigation2 />
      <div className="container p-4">
      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={Home} />
      <Route path="/user" component={CreateUser} />
      {/* Gestión Equiipo */}
      <Route path="/createApunte" component={CreateApunte} />
      <Route path="/editApunte/:id" component={CreateApunte} />
      <Route path="/apuntes" component={ApuntesList} />
    </div>
    </Router>
  );
}

export default App;