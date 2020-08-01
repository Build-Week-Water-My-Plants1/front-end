import React, { useState, useEffect } from 'react';
import img from '../assets/plant3.jpg';

import { axiosWithAuth } from '../utils/axiosWithAuth';
import { editUserInfo } from '../actions/actions';
import styled from 'styled-components';
import Nav from './Nav';


const Input =styled.input`
width: 335px;
height: 40px;
stroke: #d6ebec;
border-radius: 10px;
margin: 10px;
`;

const Container= styled.div`
    background-image: url(${img});
    background-size: 100% auto;
    padding-bottom: 300px;
    margin: 0 auto;
    `
    
    
const Button = styled.button`
width: 227px;
height: 36px;
background-color: #00bdc8;
border-radius: 20px;
color: #ffffff;
border: 1px solid #00bdc8
`;
// const H3 = styled.h3`
//  font-family: 'Inter', sans-serif;
// font-weight: bold;
// color: #2b3438;
// `;
const H1 = styled.h1`
font-size: 2em;
padding: 10px;
 font-family: 'Inter', sans-serif;
 font-weight: bold;
color: #2b3438;

`;

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

    const editUserInfo = (e) => {
        e.preventDefault();
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
        <Container>
            <Nav />
            <H1>Update Account</H1>
            {/* <div>
                <H3>Username: {user.username}</H3>
                <H3>Phone Number: {user.phone_number}</H3>

            </div> */}
            <form onSubmit={editUserInfo}>
                
                <Input
                    type='text'
                    name='phone_number'
                    id='phone_number'
                    placeholder='Update Phone Number'
                    value={user.phone_number}
                    onChange={handleChange}

                /><br/>
                
                <Input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Update Password'
                    value={user.password}
                    onChange={handleChange}
                /><br/>
                <Button >Update</Button>
            </form>

        </Container>
    )
}
export default UserInfo;