import { createSlice } from '@reduxjs/toolkit'

const mangkalSlice = createSlice({
    name: "mangkal",
    initialState:{
        geo: null,
        alamat: null,
        geohash: null,
    },
    reducers:{
        updateMangkal: (state, action) => {
            state.geo = action.payload.geo;
            state.alamat = action.payload.alamat;
            state.geohash = action.payload.geohash;
        },
        resetMangkal: (state) => {
            state.geo = null;
            state.alamat = null;
            state.geohash = null;
        }
    }
});

export const { updateMangkal, resetMangkal } = mangkalSlice.actions;
export default mangkalSlice.reducer; 