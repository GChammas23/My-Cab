import { combineReducers } from 'redux';

import userReducer from './userReducer';
import pricesReducer from './pricesReducer';

const reducers = combineReducers({
    userReducer,
    pricesReducer,
});

export default reducers;
