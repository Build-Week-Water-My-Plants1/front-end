import React, { useState, useEffect } from 'react';
import { editUserInfo } from '../actions/actions'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../index.css';


const CustomNav = styled.nav`
display: flex;
justify-content: space-between;
padding: 30px;

`
const H1 = styled.h1`
    color: #00bdc8;
    font-size: 2em;
        max-width:50%;
        font-family: 'Noto Sans', sans-serif;

;

`

const LinkContainer = styled.div`
    max-width:50%;
    justify-content: space-between;
    display: flex;
    flex-direction: row;

`

const StyledLinks = styled.div`
    padding: 10px;

`


function Nav(props) {

    return (
        <CustomNav>
            {/* <h3>{props.username}</h3> */}
            <H1>Water My Plants</H1>
            <LinkContainer>
                <StyledLinks><Link to='/'>Home</Link></StyledLinks>
                <StyledLinks><Link to='/plantlist'>Add Plant</Link></StyledLinks>
                <StyledLinks><Link to='/plantlist2'>View Plants</Link></StyledLinks>
                <StyledLinks><Link to='/userinfo'>Account</Link></StyledLinks>
            </LinkContainer>


        </CustomNav>
    )
}
export default Nav;