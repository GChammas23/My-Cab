import {

    GET_PRICES_STARTED,
    GET_PRICES_SUCCESS,
    GET_PRICES_ERROR,

    GET_RIDE_PRICE_STARTED,
    GET_RIDE_PRICE_SUCCESS,
    GET_RIDE_PRICE_ERROR,

} from "../actions/prices";

const defaultState = {
    isLoading: false,
    prices: [],
    ridePrice: 0,
};

function pricesReducer(state = defaultState, action) {
    switch (action.type) {
        case GET_PRICES_STARTED:
            return Object.assign({}, state, {
                isLoading: true,
                prices: [],
            });
        case GET_PRICES_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                prices: action.payload.prices,
            });
        case GET_PRICES_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                prices: [],
            });

        case GET_RIDE_PRICE_STARTED:
            return Object.assign({}, state, {
                isLoading: true,
                ridePrice: 0,
            });
        case GET_RIDE_PRICE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                ridePrice: action.payload.price,
            });
        case GET_RIDE_PRICE_ERROR:
            return Object.assign({}, state, {
                isLoading: false,
                ridePrice: 0,
            });
        default:
            return state;
    }
}

export default pricesReducer;
