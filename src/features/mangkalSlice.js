import { createSlice } from '@reduxjs/toolkit'

const mangkalSlice = createSlice({
    name: "mangkal",
    initialState:{
        lok_mangkal: null,
    },
    reducers:{
        updateMangkal: (state, action) => {
            state.lok_mangkal = action.payload.lok_mangkal;
        },
        resetMangkal: (state) => {
            state.lok_mangkal = null;
        }
    }
});

export const { updateMangkal, resetMangkal } = mangkalSlice.actions;
export default mangkalSlice.reducer; 