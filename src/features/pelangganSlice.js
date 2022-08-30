import { createSlice } from '@reduxjs/toolkit';

const pelangganSlice = createSlice({
    name: "pelanggan",
    initialState:{
        kodeUID:""
    },
    reducers:{
        update: (state, action) => {
            state.kodeUID = action.payload.kodeUID;
        }
    }
});

export const { update } = pelangganSlice.actions;
export default pelangganSlice.reducer;
