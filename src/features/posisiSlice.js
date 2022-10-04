import { createSlice } from '@reduxjs/toolkit'

const posisiSlice = createSlice({
    name: "posisi",
    initialState:{
        geo_mitra: null,
        alamat_mitra: null,
        geohash_mitra: null,
    },
    reducers:{
        updatePosisi: (state, action) => {
            state.geo_mitra = action.payload.geo_mitra;
            state.alamat_mitra = action.payload.alamat_mitra;
            state.geohash_mitra = action.payload.geohash_mitra;
        },
        resetPosisi: (state) => {
            state.geo_mitra = null;
            state.alamat_mitra = null;
            state.geohash_mitra = null;
        }
    }
});

export const { updatePosisi, resetPosisi } = posisiSlice.actions;
export default posisiSlice.reducer; 