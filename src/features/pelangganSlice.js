import { createSlice } from '@reduxjs/toolkit';

const pelangganSlice = createSlice({
    name: "pelanggan",
    initialState:{
        kodeUID:"",
        namapelanggan:"",
    },
    reducers:{
        updateUID: (state, action) => {
            state.kodeUID = action.payload.kodeUID;
            state.namapelanggan = action.payload.namapelanggan;
        },
        resetPelanggan: (state) => {
            state.kodeUID = null;
            state.namapelanggan = null;
        }
    }
});

export const { updateUID, resetPelanggan } = pelangganSlice.actions;
export default pelangganSlice.reducer;