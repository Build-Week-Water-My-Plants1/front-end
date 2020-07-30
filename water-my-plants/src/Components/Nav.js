import React, {useState, useEffect} from  'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {editUserInfo} from '../actions/actions'
import {BrowserRouter as Link} from 'react-router-dom';


 function Nav(props){
    axiosWithAuth
    .put('https://water-my-plant1.herokuapp.com/userinfo',editUserInfo//??
    )
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err)
    })

    return(
    <nav>
        <h3>{props.username}</h3>
        <Link to ='/userinfo'>Account</Link>
    </nav>
    )
}
export default Nav;