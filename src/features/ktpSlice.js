import { createSlice } from '@reduxjs/toolkit'

const ktpSlice = createSlice({
    name: "ktp",
    initialState:{
        foto_ktp: null,
        foto_diri: null,
    },
    reducers:{
        updateKTP: (state, action) => {
            state.foto_ktp = action.payload.foto_ktp;
        },
        updateDiri: (state, action) => {
            state.foto_diri = action.payload.foto_diri;
        },
        resetKTP: (state) => {
            state.foto_ktp = null;
            state.foto_diri = null;
        }
    }
});

export const { updateKTP, resetKTP, updateDiri } = ktpSlice.actions;
export default ktpSlice.reducer; 