import React, {useState, useEffect} from  'react';
import {editUserInfo} from '../actions/actions'
import {BrowserRouter as Link} from 'react-router-dom';


 function Nav(props){
    
    return(
    <nav>
        {/* <h3>{props.username}</h3> */}
        <Link to ='/userinfo'>Account</Link>
    </nav>
    )
}
export default Nav;