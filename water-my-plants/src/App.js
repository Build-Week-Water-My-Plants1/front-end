import React from 'react';
import './App.css';
import PlantList from './Components/PlantList';
import {Route} from 'react-router-dom';
import AddPlant from './Components/AddPlant'

function App() {
  return (
    <div className="App">
      <Route exact path='/plantlist' component={PlantList} />
      <Route path='/add' component={AddPlant} />
      <PlantList />
    </div>
  );
}

export default App;
