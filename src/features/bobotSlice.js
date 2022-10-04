import { createSlice } from '@reduxjs/toolkit'

const bobotSlice = createSlice({
    name: "bobot",
    initialState:{
        estimasi_waktu: null,
        jarak: null,
    },
    reducers:{
        updateBobot: (state, action) => {
            state.estimasi_waktu = action.payload.estimasi_waktu;
            state.jarak = action.payload.jarak;
        },
        resetBobot: (state) => {
            state.estimasi_waktu = null;
            state.jarak = null;
        }
    }
});

export const { updateBobot, resetBobot } = bobotSlice.actions;
export default bobotSlice.reducer; 