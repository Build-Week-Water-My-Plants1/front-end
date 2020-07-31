import React, { useState, useEffect } from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';
import { editUserInfo } from '../actions/actions';


const UserInfo = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        getData();
    });

    const getData = () => {
        axiosWithAuth()
            .get('/api/users')
            .then(res => {
                console.log(res);
                setUser(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const editUserInfo = () => {
        axiosWithAuth()
            .put('/api/users',user)
            .then(res => {
                console.log(res);
                setUser(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        console.log(user)
    };


    return (
        <div>
            <h1>Update Account</h1>
            <div>
                <h3>Username: {user.username}</h3>
                <h3>Phone Number: {user.phone_number}</h3>

            </div>
            <form onSubmit={editUserInfo}>
                
                <input
                    type='text'
                    name='phone_number'
                    id='phone_number'
                    placeholder='Update Phone Number'
                    value={user.phone_number}
                    onChange={handleChange}

                />
                <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Update Password'
                    value={user.password}
                    onChange={handleChange}
                />
                <button >Update</button>
            </form>

        </div>
    )
}
export default UserInfo;