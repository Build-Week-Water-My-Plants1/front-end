import React from 'react';
import './App.css';
import PlantList from './Components/PlantList';
import {Route} from 'react-router-dom';
import AddPlant from './Components/AddPlant';
import Home from './Components/Home';
import PrivateRoute from './utils/PrivateRoute';
import {BrowserRouter as Switch } from 'react-router-dom';
import Login from './Components/Login'


function App() {
  return (
    <div className="App">
    
      {/* <Switch> */}
      {/* <Route exact path='/' component={Home} /> */}
      <Route exact path='/' component={PlantList} />

      {/* <PrivateRoute exact path ='/plantlist' component ={PlantList}/> */}
      {/* <Route path ='/login' component = {Login}/> */}
      {/* <Route path='/add' component={AddPlant} /> */}
      {/* </Switch> */}
    </div>
  );
}
export default App;
      
    

  

