import React, {useState, useEffect} from 'react';
import * as yup from 'yup';

function AddPlant() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const defaultState = {
        plantName: '',
        plantSpecies: '',
        weekly: days,
        intervalNum: '',
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
    function inputSelect(key,
                       labelFor, 
                       labelText,
                       type, 
                       name, 
                       value,
                       onChange,
                       checked) {
        return <label key={key} htmlFor={labelFor}>
               {labelText}
               <input type={type} 
                      name={name} 
                      value={value}
                      onChange={onChange} 
                      checked={checked} />
        </label>
    }

    let formSchema = yup.object().shape({
        plantName: yup.string().required('Please give your plant a nickname'),
        plantSpecies: yup.string().required('We need to know the type of plant'),
        Sun: yup.bool(),
        Mon: yup.bool(),
        Tue: yup.bool(),
        Wed: yup.bool(),
        Thu: yup.bool(),
        Fri: yup.bool(),
        Sat: yup.bool(),
        intervalNum: yup.number().notRequired(),
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
                           plant.plantName,
                           handleChange,
                           errors
                           )}
                {inputText('plantSpecies',
                           'Plant Species: ',
                           'text',
                           'plantSpecies', 
                           plant.plantSpecies,
                           handleChange,
                           errors
                           )}
                <p>Watering Frequency</p>
                <p>Weekly: </p>
                {days.map((day, i) => (
                    inputSelect(i, day, day, 'checkbox', day, plant.weekly[day], handleChange, plant.weekly[day])
                ))}
                {inputText('intervalNum', 'Every ', 'number', 'intervalNum', plant.intervalNum, handleChange, errors)} days
                {inputText('startDate', 'Start Date ', 'date', 'startDate', plant.startDate, handleChange, errors)}
                <button type='submit' disabled={disableButton}>Submit</button>
            </form>
        </div>
    )
}

export default AddPlant;