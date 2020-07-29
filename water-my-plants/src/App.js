import React from 'react';
import './App.css';
import PlantList from './Components/PlantList';
import { Route } from 'react-router-dom';
import AddPlant from './Components/AddPlant';
import Home from './Components/Home';
import PrivateRoute from './utils/PrivateRoute';
import { BrowserRouter as Switch } from 'react-router-dom';
import Login from './Components/Login'


function App() {
  return (
    <div className="App">

      <Route exact path='/' component={Home} />
      <Route path='/add' component={AddPlant} />


      <Switch>
        <PrivateRoute exact path='/plantlist' component={PlantList} />
        <Route path='/login' component={Login} />
        <Route component={Login} />

      </Switch>
    </div>
  );
}
export default App;





