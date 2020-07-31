import React, {useState, useEffect} from  'react';
import {editUserInfo} from '../actions/actions'
import {Link} from 'react-router-dom';


 function Nav(props){
    
    return(
    <nav>
        {/* <h3>{props.username}</h3> */}
                <Link to ='/'>Home</Link>
                <Link to ='/plantlist'>Add Plant</Link>
                 <Link to ='/plantlist2'>View Plants</Link>
                <Link to ='/userinfo'>Account</Link>



    </nav>
    )
}
export default Nav;