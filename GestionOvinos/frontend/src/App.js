import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

//import NavigationLogin from './components/nav/NavigationLogin'
import Navigation2 from './components/nav/Navigation2'
import Home from './components/home/Home'
import EstablesList from './components/list/EstablesList'
import Login from './components/login/Login'
import OvinosList from './components/list/OvinosList'
import CreateEstable from './components/create/CreateEstable'
import CreateOvino from './components/create/CreateOvino'
import CreateOvEs from './components/asignar/CreateOvEs'
import CreateUsEs from './components/asignar/CreateUsEs'
import CreateServicio from './components/create/CreateServicio'
import CreatePatologia from './components/create/CreatePatologia'
import CreateUser from './components/create/CreateUser'

import './App.css';

function App() {
  return (
    <Router>
      <Navigation2 />
      <div className="container p-4">
        <Route path="/establecimientos" exact component={EstablesList} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Home} />
        <Route path="/ovinos" component={OvinosList} />
        <Route path="/editEstable/:id" component={CreateEstable} />
        <Route path="/editOvEs/:id" component={CreateOvEs} />
        <Route path="/createEstable" component={CreateEstable} />
        <Route path="/createOvino" component={CreateOvino} />
        <Route path="/createOvEs" component={CreateOvEs} />
        <Route path="/createUsEs" component={CreateUsEs} />
        <Route path="/createServicio" component={CreateServicio} />
        <Route path="/editOvino/:id" component={CreateOvino} />
        <Route path="/createPatologia" component={CreatePatologia} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;