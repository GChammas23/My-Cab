import {

    GET_RIDES_STARTED,
    GET_RIDES_SUCCESS,
    GET_RIDES_ERROR,

    GET_RESERVATIONS_STARTED,
    GET_RESERVATIONS_SUCCESS,
    GET_RESERVATIONS_ERROR,

} from "../actions/rides";

const defaultState = {
    isLoading: false,
    rides: [],
    reservations: [],
};

function ridesReducer(state = defaultState, action) {
    switch (action.type) {
        case GET_RIDES_STARTED:
            return Object.assign({}, state, {
                isLoading: true,
                rides: [],
            });
        case GET_RIDES_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                rides: action.payload.data,
            });
        case GET_RIDES_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                rides: [],
            });

        case GET_RESERVATIONS_STARTED:
            return Object.assign({}, state, {
                isLoading: true,
                reservations: [],
            });
        case GET_RESERVATIONS_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                reservations: action.payload.data,
            });
        case GET_RESERVATIONS_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                reservations: [],
            });
        default:
            return state;
    }
}

export default ridesReducer;
