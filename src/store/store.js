import { configureStore } from '@reduxjs/toolkit';
import surveyReducer from './surveySlice';
import userReducer from './userDetails';
const store = configureStore({
    reducer: {
        survey: surveyReducer,
        user: userReducer,
    },

});

export default store;