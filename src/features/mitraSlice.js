import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mitra:{
    id: null,
    foto_akun: null,
    namalengkap: null,
    phone: null,
    status_sekarang: null,
    produk: null,
  },
}

export const mitraSlice = createSlice({
  name: 'mitra',
  initialState,
  reducers: {
    setMitra: (state, action) => {
        state.mitra = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMitra } = mitraSlice.actions

export const pilihMitra = (state) => state.mitra.mitra;

export default mitraSlice.reducer