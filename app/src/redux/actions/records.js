import { getUserReservation, getUserRides, deletUserData } from '../../actions/rides.action';

export const GET_RIDES_STARTED = 'GET_RIDES_STARTED'
export const GET_RIDES_SUCCESS = 'GET_RIDES_SUCCESS'
export const GET_RIDES_ERROR = 'GET_RIDES_ERROR'

export const GET_RESERVATIONS_STARTED = 'GET_RESERVATIONS_STARTED'
export const GET_RESERVATIONS_SUCCESS = 'GET_RESERVATIONS_SUCCESS'
export const GET_RESERVATIONS_ERROR = 'GET_RESERVATIONS_ERROR'

export const DELETE_DATA_STARTED = 'DELETE_DATA_STARTED'
export const DELETE_DATA_SUCCESS = 'DELETE_DATA_SUCCESS'
export const DELETE_DATA_ERROR = 'DELETE_DATA_ERROR'


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
};

export default recordsAction;