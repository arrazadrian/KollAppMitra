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
      const index = state.items.findIndex((item) => item.item.id === action.payload.item.id);

      let keranjangBaru = [...state.items];

      if(index >= 0){
        keranjangBaru.splice(index,1);
      } else {
        console.warn(
          'Tidak bisa dibuang, karena tidak ada di keranjang'
        );
      }

      state.items = keranjangBaru;
    },
    kosongkanKeranjang: (state) => {
      state.items = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { masukKeranjang, keluarKeranjang, kosongkanKeranjang } = keranjangSlice.actions

export const pilihProdukKeranjang = (state) => state.keranjang.items;

export const pilihprodukID = (state, produk) => 
  state.keranjang.items.filter((item) => item.item.id === produk.id);
  

export const totalHarga = (state) => state.keranjang.items.reduce((total, item) => 
total += Number(item.item.harga), 0)

export default keranjangSlice.reducer