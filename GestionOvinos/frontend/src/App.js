import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

//import NavigationLogin from './components/nav/NavigationLogin'
import Navigation2 from './components/nav/Navigation2'
import Home from './components/home/Home'
import EstablesList from './components/list/EstablesList'
import EstableOvinosList from './components/list/EstableOvinosList'
import PatologiasList from './components/list/PatologiasList'
import Login from './components/login/Login'
import OvinosList from './components/list/OvinosList'
import CreateEstable from './components/create/CreateEstable'
import CreateOvino from './components/create/CreateOvino'
import AsignarOvEs from './components/asignar/AsignarOvEs'
import CreateUsEs from './components/asignar/CreateUsEs'
import CreateServicio from './components/create/CreateServicio'
import CreatePatologia from './components/create/CreatePatologia'
import CreateUser from './components/create/CreateUser'

// Gestion equiipo
import CreateApunte from './components/gestionEquiipo/CreateApunte'
import ApuntesList from './components/gestionEquiipo/ApuntesList'

import './App.css';

function App() {
  return (
  <Router>
    <Navigation2 />
      <div className="container p-4">
      <Route path="/establecimientos" exact component={EstablesList} />
      <Route path="/establecimiento/:id" component={EstableOvinosList} />
      <Route path="/patologias" component={PatologiasList} />
      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={Home} />
      <Route path="/ovinos" component={OvinosList} />
      <Route path="/editEstable/:id" component={CreateEstable} />
      <Route path="/createEstable" component={CreateEstable} />
      <Route path="/createOvino" component={CreateOvino} />
      <Route path="/createOvEs" component={AsignarOvEs} />
      <Route path="/createUsEs" component={CreateUsEs} />
      <Route path="/createServicio" component={CreateServicio} />
      <Route path="/editOvino/:id" component={CreateOvino} />
      <Route path="/createPatologia" component={CreatePatologia} />
      <Route path="/user" component={CreateUser} />
      {/* Gestión Equiipo */}
      <Route path="/createApunte" component={CreateApunte} />
      <Route path="/apuntes" component={ApuntesList} />

    </div>
    </Router>
  );
}

export default App;