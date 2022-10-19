import { createSlice } from '@reduxjs/toolkit';

const pelangganSlice = createSlice({
    name: "pelanggan",
    initialState:{
        kodeUID:"",
        namapelanggan:"",
        phonepelanggan:"",
    },
    reducers:{
        updateUID: (state, action) => {
            state.kodeUID = action.payload.kodeUID;
            state.namapelanggan = action.payload.namapelanggan;
            state.phonepelanggan = action.payload.phonepelanggan;
        },
        resetPelanggan: (state) => {
            state.kodeUID = null;
            state.namapelanggan = null;
            state.phonepelanggan = null;
        }
    }
});

export const { updateUID, resetPelanggan } = pelangganSlice.actions;
export default pelangganSlice.reducer;