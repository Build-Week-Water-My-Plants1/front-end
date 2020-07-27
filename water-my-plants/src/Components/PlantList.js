import React, {useState} from  'react';
import data from './data';
import * as img from '../assets/brown-plant-and-flowers-1924867.jpg'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardColumns
} from 'reactstrap';
import ModalExample from './Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function PlantList() {
    const [dataHere] = useState(data);

    return(
        <div>
            <p>plant list</p>
            <ModalExample buttonLabel='click' />
                <CardColumns>
            {dataHere.map((plant, i) => (
                    <Card key={i}>
                        <CardImg top width = '100%' src={img} alt='placeholder image' />
                        <CardBody>
                            <CardTitle>{plant.plantName}</CardTitle>
                            <CardSubtitle>{plant.plantSpecies}</CardSubtitle>
                            {plant.weekly !== '' ? <CardText>{plant.weekly}</CardText> : <CardText>{plant.intervalNum}</CardText>}
                            <Button>Button</Button>
                        </CardBody>
                    </Card>
            ))}
            </CardColumns>
        </div>
    )
}

export default PlantList;