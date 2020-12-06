import { combineReducers } from 'redux';

import userReducer from './userReducer';
import pricesReducer from './pricesReducer';
import ridesReducer from './ridesReducer';

const reducers = combineReducers({
    userReducer,
    pricesReducer,
    ridesReducer,
});

export default reducers;
