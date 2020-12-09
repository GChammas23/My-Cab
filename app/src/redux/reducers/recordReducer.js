import {

    GET_RIDES_STARTED,
    GET_RIDES_SUCCESS,
    GET_RIDES_ERROR,

    GET_RESERVATIONS_STARTED,
    GET_RESERVATIONS_SUCCESS,
    GET_RESERVATIONS_ERROR,

    ADD_RIDE_STARTED,
    ADD_RIDE_SUCCESS,
    ADD_RIDE_ERROR,

    UPDATE_RESERVATION_STARTED,
    UPDATE_RESERVATION_SUCCESS,
    UPDATE_RESERVATION_ERROR,

    DELETE_DATA_STARTED,
    DELETE_DATA_SUCCESS,
    DELETE_DATA_ERROR,

    DELETE_RECORD_STARTED,
    DELETE_RECORD_SUCCESS,
    DELETE_RECORD_ERROR,

} from "../actions/records";

const defaultState = {
    isLoading: false,
    rides: [],
    reservations: [],
    dataDeleted: false,
    recordDeleted: false,
    rideAdded: false,
    reservationUpdated: true,
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

        case ADD_RIDE_STARTED:
            return Object.assign({}, state, {
                isLoading: true,
                rideAdded: false,
            });
        case ADD_RIDE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                rideAdded: true,
            });
        case ADD_RIDE_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                rideAdded: false,
            });

        case UPDATE_RESERVATION_STARTED:
            return Object.assign({}, state, {
                isLoading: true,
                reservationUpdated: false,
            });
        case UPDATE_RESERVATION_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                reservationUpdated: true,
            });
        case UPDATE_RESERVATION_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                reservationUpdated: false,
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
                dataDeleted: false,
            });
        case DELETE_DATA_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                dataDeleted: true,
            });
        case DELETE_DATA_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                dataDeleted: false,
            });

        case DELETE_RECORD_STARTED:
            return Object.assign({}, state, {
                isLoading: true,
                recordDeleted: false,
            });
        case DELETE_RECORD_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                recordDeleted: true,
            });
        case DELETE_RECORD_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                recordDeleted: false,
            });
        default:
            return state;
    }
}

export default recordReducer;
