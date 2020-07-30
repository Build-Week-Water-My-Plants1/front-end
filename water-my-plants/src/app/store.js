import { configureStore } from '@reduxjs/toolkit';
import { plantReducer } from "../reducers/plantReducer";
import thunk from 'redux-thunk';

export default configureStore({
  reducer: {
    plants: plantReducer
  },
}, [thunk]);
