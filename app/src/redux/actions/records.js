import { getUserReservation, getUserRides } from '../../actions/rides.action';

export const GET_RIDES_STARTED = 'GET_RIDES_STARTED'
export const GET_RIDES_SUCCESS = 'GET_RIDES_SUCCESS'
export const GET_RIDES_ERROR = 'GET_RIDES_ERROR'

export const GET_RESERVATIONS_STARTED = 'GET_RESERVATIONS_STARTED'
export const GET_RESERVATIONS_SUCCESS = 'GET_RESERVATIONS_SUCCESS'
export const GET_RESERVATIONS_ERROR = 'GET_RESERVATIONS_ERROR'


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
};

export default recordsAction;