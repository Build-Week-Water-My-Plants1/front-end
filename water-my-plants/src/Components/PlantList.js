import React, {useState, useEffect} from  'react';
import * as img from '../assets/brown-plant-and-flowers-1924867.jpg'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardColumns
} from 'reactstrap';
import ModalExample from './Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { getPlants } from "../actions/actions";
import { deletePlant } from "../actions/actions";

import { connect } from "react-redux";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Nav from './Nav';


function PlantList({plants, getPlants, deletePlant}) {
    let result = [{}];

    useEffect(() => {
        getPlants();
    }, []);

    console.log(plants);

    return(
        <div>
           <Nav />
            <p>plant list</p>
            <ModalExample buttonLabel='Add a Plant' />

            <CardColumns>
                {plants.map((plant, i) => (
                    <Card key={i}>
                        <CardImg top width = '100%' src={img} alt='placeholder image' />
                        <CardBody>
                            <CardTitle>Nickname: {plant.plantName}</CardTitle>
                            <CardSubtitle>Type of Plant: {plant.plantSpecies}</CardSubtitle>
                            <CardText>Watering Frequency:</CardText>
                            {plant.weekly !== '' ? <CardText>Every {plant.weekly}</CardText> : <CardText>Every {plant.intervalNum} days</CardText>}
                            <CardText>Starting on: {plant.startDate}</CardText>
                            <div><ModalExample buttonLabel='Edit Plant' plantId={i} />

                            <button onclick={()=>deletePlant(plant)}>Delete</button></div>
                        </CardBody>
                    </Card>
                ))}
            </CardColumns>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        plants: state.plants
    }
}

export default connect(mapStateToProps, {getPlants ,deletePlant})(PlantList);