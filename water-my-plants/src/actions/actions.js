import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const FETCHING_DATA_START = 'FETCHING_DATA_START';
export const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS';
export const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';
export const ADD_PLANT = 'ADD_PLANT';
export const EDIT_PLANT = 'EDIT_PLANT';
export const DELETE_PLANT = 'DELETE_PLANT';
export const EDIT_USER = 'EDIT_USER';

export const getPlants = () => dispatch => {
    dispatch({type: FETCHING_DATA_START});
    axiosWithAuth()
        .get('/plantlist/')
        .then(res => {
            console.log(res.data);
            dispatch({
                type : FETCHING_DATA_SUCCESS, 
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: FETCHING_DATA_FAILURE,
                payload: err
            });
        });
        
};

export const addPlant = (plant)=>(dispatch)=>{
    axiosWithAuth()
        .post('/plantlist/', plant)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: ADD_PLANT,
                payload: plant
            });
        })
        .catch(err => {
            console.log(err);
        });
};

export const deletePlant = (plant) => (dispatch) => {
    axiosWithAuth()
        .delete(`plant/${plant.id}`)
        .then((res)=>{
            dispatch({type: DELETE_PLANT, payload: plant});
        })
        .catch((err)=>{
            console.log(err);
        })
};

export const editPlant = (plant) => (dispatch) => {
    axiosWithAuth()
    .put(`/plantlist/${plant.id}`, plant)
    .then(res=>{
        dispatch({
            type: EDIT_PLANT,
            payload: plant
        });
    })
    .catch((err)=>{
        console.log(err)
    });
};

export const editUserInfo = (user) => (dispatch) => {
    axiosWithAuth()
    .put(`${user.id}`, user) //need to get the endpoint for this
    .then(res=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err)
    });
};

