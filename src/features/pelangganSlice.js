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
        }
    }
});

export const { updateUID } = pelangganSlice.actions;
export default pelangganSlice.reducer;