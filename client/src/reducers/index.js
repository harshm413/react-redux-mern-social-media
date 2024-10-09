import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import postReducer from './PostReducer';
import chatReducer from './ChatUserReducer';

// Combine all reducers into a single reducer
export const reducers = combineReducers({
    authReducer,
    postReducer,
    chatReducer,
});
