import React, {useState} from 'react';

function AddPlant() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const defaultState = {
        plantName: '',
        plantSpecies: '',
        Sun: false,
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        intervalNum: '',
        startDate: '',
    }
    const [addPlant, setAddPlant] = useState(defaultState);

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
        console.log(event.target.value);
        setAddPlant({
            ...addPlant,
            [event.target.name]: targetValue
        });
        console.log(event);
    }

    return(
        <div>
            <p>add plant</p>
            <form>
                {inputText('plantName',
                           'Plant Nickname: ',
                           'text',
                           'plantName', 
                           addPlant.plantName,
                           handleChange
                           )}
                {inputText('plantSpecies',
                           'Plant Species: ',
                           'text',
                           'plantSpecies', 
                           addPlant.plantSpecies,
                           handleChange
                           )}
                <p>Watering Frequency</p>
                <p>Weekly: </p>
                {days.map((day, i) => (
                    inputSelect(i, day, day, 'checkbox', 'dayOfWeek', addPlant[day], handleChange, addPlant[day])
                ))}
                {inputText('intervalNum', 'Every ', 'number', 'intervalNum', addPlant.intervalNum, handleChange)} days
                {inputText('startDate', 'Start Date ', 'date', 'startDate', addPlant.startDate, handleChange)}
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddPlant;