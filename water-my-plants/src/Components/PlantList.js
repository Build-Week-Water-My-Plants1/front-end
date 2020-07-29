import React, {useState} from  'react';
import data from './data';
import * as img from '../assets/brown-plant-and-flowers-1924867.jpg'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardColumns
} from 'reactstrap';
import ModalExample from './Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function PlantList() {
    const [dataHere] = useState(data);

    return(
        <div>
            <p>plant list</p>
            <ModalExample buttonLabel='Add a Plant' />
            <CardColumns>
                {dataHere.map((plant, i) => (
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

export default PlantList;