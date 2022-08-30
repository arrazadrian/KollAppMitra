import { createSlice } from '@reduxjs/toolkit';

const pelangganSlice = createSlice({
    name: "pelanggan",
    initialState:{
        kodeUID:"",
    },
    reducers:{
        updateUID: (state, action) => {
            state.kodeUID = action.payload.kodeUID;
        }
    }
});

export const { updateUID } = pelangganSlice.actions;
export default pelangganSlice.reducer;
