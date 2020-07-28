import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import { Button, ModalFooter } from 'reactstrap';
import AddPlant from './AddPlant'

function PlantForm(props, addPlantProps) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const defaultState = {
        plantName: '',
        plantSpecies: '',
        weekly: '',
        intervalNum: 0,
        startDate: '',
    }
    
    const [plant, setPlant] = useState(defaultState);
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
        console.log('changed plant', plant);
        validateChange(event, targetValue);
    }

    const handleSubmit = event => {
        event.preventDefault();
        setPlant({
            ...plant,
            [event.target.name]: event.target.value
        });
        console.log('submit plant', plant);
        setPlant(defaultState);
    }

    return(
        <div>
            <p>Add A Plant</p>
            <form onSubmit={handleSubmit}>
                {inputText('plantName',
                           'Plant Nickname: ',
                           'text',
                           'plantName', 
                           addPlantProps.plantName,
                           handleChange,
                           addPlantProps.errors
                           )}
                {errors.plantName.length > 0 ? <p>{errors.plantName}</p> : ''}
                {inputText('plantSpecies',
                           'Plant Species: ',
                           'text',
                           'plantSpecies', 
                           addPlantProps.plantSpecies,
                           handleChange,
                           addPlantProps.errors
                           )}
                {errors.plantSpecies.length > 0 ? <p>{errors.plantSpecies}</p> : ''}
                <p>Watering Frequency</p>
                {'Weekly: '}
                <label htmlFor='weekly'>
                    <select name='weekly' onChange={handleChange} value={addPlantProps.weekly}>
                        <option value=''> Choose a day:</option>
                        {days.map((day, i) => 
                            <option value={day} key={i}>{day}</option>
                        )}
                    </select>
                </label>
                <br />
                {inputText('intervalNum', 'Every ', 'number', 'intervalNum', addPlantProps.intervalNum, handleChange, errors)} days
                <br />
                {inputText('startDate', 'Start Date ', 'date', 'startDate', plant.startDate, handleChange, errors)}
                {errors.startDate.length > 0 ? <p>{errors.startDate}</p> : ''}
        <ModalFooter>
          <Button color="primary" type='submit' disabled={disableButton} onClick={props.toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
            </form>
        </div>
    )
}

export default PlantForm;