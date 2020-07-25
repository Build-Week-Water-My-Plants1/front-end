import React, {useState} from 'react';

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

    function inputText(labelFor, 
                       labelText,
                       type, 
                       name, 
                       value,
                       onChange) {
        return <label htmlFor={labelFor}>
               {labelText}
               <input type={type} 
                      name={name} 
                      value={value}
                      onChange={onChange} />
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

    const handleChange = event => {
        const targetValue =
        event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setPlant({
            ...plant,
            [event.target.name]: targetValue
        });
        console.log(plant);
    }

    return(
        <div>
            <p>add plant</p>
            <form>
                {inputText('plantName',
                           'Plant Nickname: ',
                           'text',
                           'plantName', 
                           plant.plantName,
                           handleChange,
                           )}
                {inputText('plantSpecies',
                           'Plant Species: ',
                           'text',
                           'plantSpecies', 
                           plant.plantSpecies,
                           handleChange
                           )}
                <p>Watering Frequency</p>
                <p>Weekly: </p>
                {days.map((day, i) => (
                    inputSelect(i, day, day, 'checkbox', day, plant.weekly, handleChange, plant.weekly[day])
                ))}
                {inputText('intervalNum', 'Every ', 'number', 'intervalNum', plant.intervalNum, handleChange)} days
                {inputText('startDate', 'Start Date ', 'date', 'startDate', plant.startDate, handleChange)}
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddPlant;