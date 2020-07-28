import { FETCHING_DATA_START } from "../actions/actions";
import { FETCHING_DATA_SUCCESS } from "../actions/actions";
import { FETCHING_DATA_FAILURE } from "../actions/actions";
import { ADD_PLANT } from "../actions/actions";
import { EDIT_PLANT } from "../actions/actions";
import { DELETE_PLANT } from "../actions/actions";

const initialState = {
    plants: [],
    isFetching: false,
    fetchingError: "",
    isPosting: false,
    postingError: "",
    isDeleting: false,
    deletingError: ""
}

export const plantsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_DATA_START:
            return {
                ...state,
                isFetching: true,
                fetchingError: ""  
            };
        case FETCHING_DATA_SUCCESS:
            console.log(action.payload);
            return state; //will need to set plants here when endpoint is working
        case FETCHING_DATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                fetchingError: action.payload
            }
        case ADD_PLANT:
            return state;
        case EDIT_PLANT:
            return state;
        case DELETE_PLANT:
            return state;
    }
}