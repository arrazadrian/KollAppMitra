import { createSlice } from '@reduxjs/toolkit';

const datapmSlice = createSlice({
    name: "datapm",
    initialState:{
        id_transaksi: null,
        namamitra: null,
        namatoko: null,
        id_pelanggan: null,
        namapelanggan: null,
        phonepelanggan: null,
        hargalayanan: null,
    },
    reducers:{
        updateDatapm: (state, action) => {
            state.id_transaksi = action.payload.id_transaksi;
            state.namamitra = action.payload.namamitra;
            state.namatoko = action.payload.namatoko;
            state.id_pelanggan = action.payload.id_pelanggan;
            state.namapelanggan = action.payload.namapelanggan;
            state.phonepelanggan = action.payload.phonepelanggan;
            state.hargalayanan = action.payload.hargalayanan;
        },
        resetDatapm: (state) => {
            state.id_transaksi =  null;
            state.namamitra =  null;
            state.namatoko =  null;
            state.id_pelanggan =  null;
            state.namapelanggan =  null;
            state.phonepelanggan =  null;
            state.hargalayanan =  null;
        }
    }
});

export const { updateDatapm, resetDatapm } = datapmSlice.actions;
export default datapmSlice.reducer;