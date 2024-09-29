import {combineReducers, configureStore} from '@reduxjs/toolkit';
import questionsReducer from './questionReducer';
import resultReducers from './resultsReducers';
const rootReducer = combineReducers({questionsReducer,resultReducers});

export default configureStore({
    reducer: rootReducer,
});

