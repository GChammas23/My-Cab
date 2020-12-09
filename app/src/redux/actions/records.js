import {
    getUserReservation,
    getUserRides,
    deletUserData,
    deleteUserRecord,
    addRide,
    updateUserReservation,
    getUserRidesPrices
} from '../../actions/rides.action';

export const GET_RIDES_STARTED = 'GET_RIDES_STARTED'
export const GET_RIDES_SUCCESS = 'GET_RIDES_SUCCESS'
export const GET_RIDES_ERROR = 'GET_RIDES_ERROR'

export const GET_RIDES_PRICES_STARTED = 'GET_RIDES_PRICES_STARTED'
export const GET_RIDES_PRICES_SUCCESS = 'GET_RIDES_PRICES_SUCCESS'
export const GET_RIDES_PRICES_ERROR = 'GET_RIDES_PRICES_ERROR'

export const ADD_RIDE_STARTED = 'ADD_RIDE_STARTED'
export const ADD_RIDE_SUCCESS = 'ADD_RIDE_SUCCESS'
export const ADD_RIDE_ERROR = 'ADD_RIDE_ERROR'

export const UPDATE_RESERVATION_STARTED = 'UPDATE_RESERVATION_STARTED'
export const UPDATE_RESERVATION_SUCCESS = 'UPDATE_RESERVATION_SUCCESS'
export const UPDATE_RESERVATION_ERROR = 'UPDATE_RESERVATION_ERROR'

export const GET_RESERVATIONS_STARTED = 'GET_RESERVATIONS_STARTED'
export const GET_RESERVATIONS_SUCCESS = 'GET_RESERVATIONS_SUCCESS'
export const GET_RESERVATIONS_ERROR = 'GET_RESERVATIONS_ERROR'

export const DELETE_DATA_STARTED = 'DELETE_DATA_STARTED'
export const DELETE_DATA_SUCCESS = 'DELETE_DATA_SUCCESS'
export const DELETE_DATA_ERROR = 'DELETE_DATA_ERROR'

export const DELETE_RECORD_STARTED = 'DELETE_RECORD_STARTED'
export const DELETE_RECORD_SUCCESS = 'DELETE_RECORD_SUCCESS'
export const DELETE_RECORD_ERROR = 'DELETE_RECORD_ERROR'


const recordsAction = {

    getUserReservations: (username) => async (dispatch) => {
        try {
            dispatch({
                type: GET_RESERVATIONS_STARTED,
            });
            let response = await getUserReservation(username);
            dispatch({
                type: GET_RESERVATIONS_SUCCESS,
                payload: {
                    data: response.res,
                }
            });
        } catch (error) {
            dispatch({
                type: GET_RESERVATIONS_ERROR,
            });
        }
    },

    getUserRidesPrices: (username) => async (dispatch) => {
        try {
            dispatch({
                type: GET_RIDES_PRICES_STARTED,
            });
            let response = await getUserRidesPrices(username);
            dispatch({
                type: GET_RIDES_PRICES_SUCCESS,
                payload: {
                    data: response.res,
                }
            });
        } catch (error) {
            dispatch({
                type: GET_RIDES_PRICES_ERROR,
            });
        }
    },

    addRide: (ride) => async (dispatch) => {
        try {
            dispatch({
                type: ADD_RIDE_STARTED,
            });
            await addRide(ride);
            dispatch({
                type: ADD_RIDE_SUCCESS,
            });
        } catch (error) {
            dispatch({
                type: ADD_RIDE_ERROR,
            });
        }
    },

    updateReservation: (ride) => async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_RESERVATION_STARTED,
            });
            await updateUserReservation(ride);
            dispatch({
                type: UPDATE_RESERVATION_SUCCESS,
            });
        } catch (error) {
            dispatch({
                type: UPDATE_RESERVATION_ERROR,
            });
        }
    },

    getUserRides: (username) => async (dispatch) => {
        try {
            dispatch({
                type: GET_RIDES_STARTED,
            });
            let response = await getUserRides(username);
            dispatch({
                type: GET_RIDES_SUCCESS,
                payload: {
                    data: response.res,
                }
            });
        } catch (error) {
            dispatch({
                type: GET_RIDES_ERROR,
            });
        }
    },

    deleteUserData: (username) => async (dispatch) => {
        try {
            dispatch({
                type: DELETE_DATA_STARTED,
            });
            let response = await deletUserData(username);
            dispatch({
                type: DELETE_DATA_SUCCESS,
                payload: {
                    data: response.res,
                }
            });
        } catch (error) {
            dispatch({
                type: DELETE_DATA_ERROR,
            });
        }
    },

    deleteRecord: (data) => async (dispatch) => {
        try {
            dispatch({
                type: DELETE_RECORD_STARTED,
            });
            await deleteUserRecord(data);
            dispatch({
                type: DELETE_RECORD_SUCCESS,
            });
        } catch (error) {
            dispatch({
                type: DELETE_RECORD_ERROR,
            });
        }
    },
};

export default recordsAction;