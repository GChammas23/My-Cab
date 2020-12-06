import { getPrices, getRidePrice } from '../../actions/prices.action';

export const GET_PRICES_STARTED = 'GET_PRICES_STARTED'
export const GET_PRICES_SUCCESS = 'GET_PRICES_SUCCESS'
export const GET_PRICES_ERROR = 'GET_PRICES_ERROR'

export const GET_RIDE_PRICE_STARTED = 'GET_RIDE_PRICE_STARTED'
export const GET_RIDE_PRICE_SUCCESS = 'GET_RIDE_PRICE_SUCCESS'
export const GET_RIDE_PRICE_ERROR = 'GET_RIDE_PRICE_ERROR'


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


    getRidePrice: (ride) => async (dispatch) => {
        try {
            dispatch({
                type: GET_RIDE_PRICE_STARTED,
            });
            let response = await getRidePrice(ride);
            dispatch({
                type: GET_RIDE_PRICE_SUCCESS,
                payload: {
                    price: response.res[0].price,
                }
            });
        } catch (error) {
            dispatch({
                type: GET_RIDE_PRICE_ERROR,
            });
        }
    },
};

export default pricesAction;