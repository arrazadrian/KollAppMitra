import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: "kategori",
    initialState:{
        aktif:0,
    },
    reducers:{
        updateProses: (state, action) => {
            state.aktif = action.payload.aktif;
        },
        resetProses: (state) => {
            state.aktif = 0;
        }
    }
});

export const { updateProses, resetProses } = counterSlice.actions;
export default counterSlice.reducer;