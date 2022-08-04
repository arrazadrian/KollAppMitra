import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const keranjangSlice = createSlice({
  name: 'keranjang',
  initialState,
  reducers: {
    masukKeranjang: (state, action) => {
      state.items = [...state.items, action.payload] 
    },
    keluarKeranjang: (state, action) => {
      state.value -= 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { masukKeranjang, keluarKeranjang } = keranjangSlice.actions

export const pilihProdukKeranjang = (state) => state.keranjang.items;

export const pilihprodukID = (state, item) =>
    state.keranjang.items.filter(() => item.id == '7FleRxJl7GEriYyqeRBL');
  

export default keranjangSlice.reducer