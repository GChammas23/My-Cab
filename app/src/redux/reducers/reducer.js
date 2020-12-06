import { combineReducers } from 'redux';

import userReducer from './userReducer';
import pricesReducer from './pricesReducer';
import recordReducer from './recordReducer';

const reducers = combineReducers({
    userReducer,
    pricesReducer,
    recordReducer,
});

export default reducers;
