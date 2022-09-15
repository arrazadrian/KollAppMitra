import { createSlice } from '@reduxjs/toolkit';

const kategoriSlice = createSlice({
    name: "kategori",
    initialState:{
        pilkategori:"Semua Produk",
    },
    reducers:{
        updateKategori: (state, action) => {
            state.pilkategori = action.payload.pilkategori;
        },
        resetKategori: (state) => {
            state.pilkategori = "Semua Produk";
        }
    }
});

export const { updateKategori, resetKategori } = kategoriSlice.actions;
export default kategoriSlice.reducer;