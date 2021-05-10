import { combineReducers } from 'redux';

import alertReducer from './alert/alertReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
   user: userReducer,
   alert: alertReducer,
});

export default rootReducer;
