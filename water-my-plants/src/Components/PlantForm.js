import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import { Button, ModalFooter } from 'reactstrap';
import data from './data';

function PlantForm(propsFromModal) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const defaultState = {
        plantName: '',
        plantSpecies: '',
        weekly: '',
        intervalNum: 0,
        startDate: '',
    }
    
    const [plant, setPlant] = useState(defaultState);
    useEffect(() => {if(propsFromModal.plantId >= 0) {
        const id = propsFromModal.plantId;
        const editState = {
            plantName: data[id].plantName,
            plantSpecies: data[id].plantSpecies,
            weekly: data[id].weekly,
            intervalNum: data[id].intervalNum,
            startDate: data[id].startDate,
        }
        setPlant(editState);
    }}, [propsFromModal.plantId])
    const [errors, setErrors] = useState(defaultState);
    const [disableButton, setDisableButton] = useState(true);

    function inputText(labelFor, 
                       labelText,
                       type, 
                       name, 
                       value,
                       onChange,
                       errors) {
        return <label htmlFor={labelFor}>
               {labelText}
               <input type={type} 
                      name={name} 
                      value={value}
                      onChange={onChange}
                      errors={errors} />
        </label>
    }

    let formSchema = yup.object().shape({
        plantName: yup.string().required('Please give your plant a nickname'),
        plantSpecies: yup.string().required('We need to know the type of plant'),
        weekly: yup.string(),
        intervalNum: yup.number(),
        startDate: yup.date().required('When would you like to start?'),
    })

    const validateChange = (event, value) => {
        event.persist();

        yup.reach(formSchema, event.target.name)
            .validate(value)
            .then(valid => {
                console.log('valid', valid);
                setErrors({...errors, [event.target.name]: ''})
            })
            .catch(error => {
                console.log('error', error);
                setErrors({...errors, [event.target.name]: error.errors[0]})
            })
    }
    
    useEffect(() => {
        formSchema.isValid(plant).then(valid => setDisableButton(!valid));
        }, [formSchema, plant])

    const handleChange = event => {
        const targetValue =
        event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setPlant({
            ...plant,
            [event.target.name]: targetValue
        });
        validateChange(event, targetValue);
    }

    const handleSubmit = event => {
        event.preventDefault();
        setPlant({
            ...plant,
            [event.target.name]: event.target.value
        });
        setPlant(defaultState);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                {inputText('plantName',
                           'Plant Nickname: ',
                           'text',
                           'plantName', 
                           plant.plantName,
                           handleChange,
                           plant.errors
                           )}
                {errors.plantName.length > 0 ? <p>{errors.plantName}</p> : ''}
                {inputText('plantSpecies',
                           'Plant Species: ',
                           'text',
                           'plantSpecies', 
                           plant.plantSpecies,
                           handleChange,
                           plant.errors
                           )}
                {errors.plantSpecies.length > 0 ? <p>{errors.plantSpecies}</p> : ''}
                <p>Watering Frequency</p>
                {'Weekly: '}
                <label htmlFor='weekly'>
                    <select name='weekly' onChange={handleChange} value={plant.weekly}>
                        <option value=''> Choose a day:</option>
                        {days.map((day, i) => 
                            <option value={day} key={i}>{day}</option>
                        )}
                    </select>
                </label>
                <br />
                {inputText('intervalNum', 'Every ', 'number', 'intervalNum', plant.intervalNum, handleChange, errors)} days
                <br />
                {inputText('startDate', 'Start Date ', 'date', 'startDate', plant.startDate, handleChange, errors)}
                {errors.startDate.length > 0 ? <p>{errors.startDate}</p> : ''}
                <ModalFooter>
                    <Button color="primary" type='submit' disabled={disableButton} onClick={propsFromModal.toggle}>Submit</Button>{' '}
                    <Button color="secondary" onClick={propsFromModal.toggle}>Cancel</Button>
                </ModalFooter>
            </form>
        </div>
    )
}

export default PlantForm;