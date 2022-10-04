import { createSlice } from '@reduxjs/toolkit'

const posisiSlice = createSlice({
    name: "posisi",
    initialState:{
        geo: null,
        alamat: null,
        geohash: null,
    },
    reducers:{
        updatePosisi: (state, action) => {
            state.geo = action.payload.geo;
            state.alamat = action.payload.alamat;
            state.geohash = action.payload.geohash;
        },
        resetPosisi: (state) => {
            state.geo = null;
            state.alamat = null;
            state.geohash = null;
        }
    }
});

export const { updatePosisi, resetPosisi } = posisiSlice.actions;
export default posisiSlice.reducer; 