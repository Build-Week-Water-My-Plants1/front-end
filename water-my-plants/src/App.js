import React from 'react';
import './App.css';
import PlantList from './Components/PlantList';
import {Route} from 'react-router-dom';
import Home from './Components/Home';
import PrivateRoute from './utils/PrivateRoute';
import {BrowserRouter as Switch } from 'react-router-dom';
import Login from './Components/Login'
import ModalExample from './Components/Modal';


function App() {
  return (
    <div className="App">
    
      {/* <Switch>
      <Route exact path='/' component={Home} />

      <PrivateRoute exact path ='/plantlist' component ={PlantList}/>
      <Route path ='/login' component = {Login}/>
      </Switch> */}

  <Route path ='/' component = {PlantList}/>

    </div>
  );
}
export default App;
      
    

  

