import React, {useState, useEffect} from  'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardColumns
} from 'reactstrap';
import ModalExample from './Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function LizPlantList() {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        axios
            .get('https://reqres.in/api/users?page=2')
            .then(res => setPlants(res.data.data))
            .catch(err => console.log(err))
    }, [])

    console.log(plants);

    return(
        <div>
            <p>Your Plants</p>
            <ModalExample buttonLabel='Add a Plant' />
            <CardColumns>
                {plants.map(plant => (
                    <Card key={plant.id}>
                        <CardImg src={plant.avatar} alt='avatar' />
                        <CardBody>
                            <CardTitle>Nickname: {plant.first_name}</CardTitle>
                            <CardSubtitle>Type of Plant: {plant.last_name}</CardSubtitle>
                            <CardText>Watering Frequency:</CardText>
                            <CardText>Every {plant.id} days</CardText>
                            <div><ModalExample buttonLabel='Edit Plant' plantId={plant.id} /></div>
                        </CardBody>
                    </Card>
                ))}
            </CardColumns>
        </div>
    )
}

export default LizPlantList;