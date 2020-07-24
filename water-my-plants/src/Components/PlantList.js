import React from  'react';
import {Link} from 'react-router-dom';

function PlantList() {
    return(
        <div>
            <p>plant list</p>
            <Link to={`/add`}>
                add plant
            </Link>
        </div>
    )
}

export default PlantList;