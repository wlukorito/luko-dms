import { combineReducers } from 'redux';
import authReducer from './authReducer';
import uploadsReducer from './uploadedReducer';
import finishedReducer from './finishedReducer';

export default combineReducers({
    auth: authReducer,
    uploaded: uploadsReducer,
    finished: finishedReducer
});
