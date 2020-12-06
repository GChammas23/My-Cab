import {

    GET_RIDES_STARTED,
    GET_RIDES_SUCCESS,
    GET_RIDES_ERROR,

    GET_RESERVATIONS_STARTED,
    GET_RESERVATIONS_SUCCESS,
    GET_RESERVATIONS_ERROR,

    DELETE_DATA_STARTED,
    DELETE_DATA_SUCCESS,
    DELETE_DATA_ERROR,

} from "../actions/records";

const defaultState = {
    isLoading: false,
    rides: [],
    reservations: [],
    recordsDeleted: false,
};

function recordReducer(state = defaultState, action) {
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

        case DELETE_DATA_STARTED:
            return Object.assign({}, state, {
                isLoading: true,
                recordsDeleted: false,
            });
        case DELETE_DATA_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                recordsDeleted: true,
            });
        case DELETE_DATA_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                recordsDeleted: false,
            });
        default:
            return state;
    }
}

export default recordReducer;
