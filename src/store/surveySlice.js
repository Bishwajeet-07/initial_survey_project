import { createSlice } from "@reduxjs/toolkit";

const surveySlice = createSlice({
    name:"survey",
    initialState:[],
    reducers: {
        AddQuestion: (state, action) => {
            state.push(action.payload);
        },
        AddAnswer: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const {AddQuestion,AddAnswer} = surveySlice.actions;
export default surveySlice.reducer;
    