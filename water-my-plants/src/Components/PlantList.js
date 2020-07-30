import React, {useState, useEffect} from  'react';
import data from './data';
import * as img from '../assets/brown-plant-and-flowers-1924867.jpg'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardColumns
} from 'reactstrap';
import ModalExample from './Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function PlantList() {
    const [dataHere] = useState(data);
    let result = [{}];

    axios
        .get("https://reqres.in/api/users?page=2")
        .then(res => {
            Object.values(res.data.data).map(val =>
                result.push(val));

        })
        .catch(err => console.log(err));
        console.log('result arr', result);
import { getPlants } from "../actions/actions";
import { connect } from "react-redux";

function PlantList({plants, getPlants}) {
    //const [dataHere] = useState(data);

    useEffect(() => {
        getPlants();
    }, []);

    return(
        <div>
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
                            <div><ModalExample buttonLabel='Edit Plant' plantId={i} /></div>
                        </CardBody>
                    </Card>
                ))}
            </CardColumns>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        plants: state.plantReducer.plants
    }
}

export default connect(mapStateToProps, {getPlants})(PlantList);