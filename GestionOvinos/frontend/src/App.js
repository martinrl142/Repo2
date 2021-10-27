import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import EstablesList from './components/EstablesList'
import Login from './components/Login'
import OvinosList from './components/OvinosList'
import CreateEstable from './components/CreateEstable'
import CreateOvino from './components/CreateOvino'
import CreateServicio from './components/CreateServicio'
import CreatePatologia from './components/CreatePatologia'
import CreateUser from './components/CreateUser'

import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={EstablesList} />
        <Route path="/login" component={Login} />
        <Route path="/ovinos" exact component={OvinosList} />
        <Route path="/editEstable/:id" component={CreateEstable} />
        <Route path="/createEstable" component={CreateEstable} />
        <Route path="/createOvino" component={CreateOvino} />
        <Route path="/createServicio" component={CreateServicio} />
        <Route path="/editOvino/:id" component={CreateOvino} />
        <Route path="/createPatologia" component={CreatePatologia} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;