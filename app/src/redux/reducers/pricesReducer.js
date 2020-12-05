import {

    GET_PRICES_STARTED,
    GET_PRICES_SUCCESS,
    GET_PRICES_ERROR

} from "../actions/prices";

const defaultState = {
    isLoading: false,
    prices: [],
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
        default:
            return state;
    }
}

export default pricesReducer;
