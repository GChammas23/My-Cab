import { getPrices } from '../../actions/prices.action';

export const GET_PRICES_STARTED = 'GET_PRICES_STARTED'
export const GET_PRICES_SUCCESS = 'GET_PRICES_SUCCESS'
export const GET_PRICES_ERROR = 'GET_PRICES_ERROR'


const pricesAction = {

    getPrices: () => async (dispatch) => {
        try {
            dispatch({
                type: GET_PRICES_STARTED,
            });
            let response = await getPrices();
            dispatch({
                type: GET_PRICES_SUCCESS,
                payload: {
                    prices: response.res,
                }
            });
        } catch (error) {
            dispatch({
                type: GET_PRICES_ERROR,
            });
        }
    },
};

export default pricesAction;