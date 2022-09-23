import { createSlice } from '@reduxjs/toolkit'

const mangkalSlice = createSlice({
    name: "mangkal",
    initialState:{
        geo: null,
        alamat: null,
    },
    reducers:{
        updateMangkal: (state, action) => {
            state.geo = action.payload.geo;
            state.alamat = action.payload.alamat;
        },
        resetMangkal: (state) => {
            state.geo = null;
            state.alamat = null;
        }
    }
});

export const { updateMangkal, resetMangkal } = mangkalSlice.actions;
export default mangkalSlice.reducer; 