import { createSlice } from "@reduxjs/toolkit";

const surveySlice = createSlice({
    name: "survey",
    initialState: {
        answers: {}, // Normalized state to avoid duplication
    },
    reducers: {
        AddQuestion: (state, action) => {
            state.push(action.payload);
        },
        AddAnswer: (state, action) => {
            state.push(action.payload);
        },
        addOrUpdateAnswer(state, action) {
            const { question, answer, inputbox } = action.payload;
            state.answers[question] = { question, answer, inputbox }; // Store all data in one object
        },
        clearSurvey(state) {
            state.answers = {}; // Clear all survey data
        },
    },

});

export const { AddQuestion, AddAnswer, addOrUpdateAnswer } = surveySlice.actions;
export default surveySlice.reducer;
