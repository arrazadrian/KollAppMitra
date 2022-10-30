import { createSlice } from '@reduxjs/toolkit'

const voucherSlice = createSlice({
    name: "voucher",
    initialState:{
        id_voucher: "",
        potongan: 0,
    },
    reducers:{
        updateVoucher: (state, action) => {
            state.id_voucher = action.payload.id_voucher;
            state.potongan = action.payload.potongan;
        },
        resetVoucher: (state) => {
            state.id_voucher = "";
            state.potongan = 0;
        }
    }
});

export const { updateVoucher, resetVoucher } = voucherSlice.actions;
export default voucherSlice.reducer; 