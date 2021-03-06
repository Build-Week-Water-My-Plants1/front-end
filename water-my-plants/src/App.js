import React from 'react';
import './App.css';
import PlantList from './Components/PlantList';
import {Route} from 'react-router-dom';
import Home from './Components/Home';
import PrivateRoute from './utils/PrivateRoute';
import {BrowserRouter as Switch } from 'react-router-dom';
import Login from './Components/Login'
import Registration from './Components/Registration';
import UserInfo from './Components/UserInfo';
import ModalExample from './Components/Modal';
import LizPlantList from './Components/LizPlantList'


function App() {
  return (
    <div className="App">
    
      <Switch>
      <Route exact path='/' component={Home} />
      <Route path ='/register' component={Registration}/>
      <PrivateRoute exact path ='/plantlist' component ={PlantList}/>
      <PrivateRoute exact path ='/plantlist2' component ={LizPlantList}/>

      <Route path ='/login' component = {Login}/>
      <Route path ='/userinfo' component={UserInfo}/>
      </Switch>

    </div>
  );
}
export default App;
      
    

  

