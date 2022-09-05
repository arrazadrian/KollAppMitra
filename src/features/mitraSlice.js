import { createSlice } from '@reduxjs/toolkit'

export const mitraSlice = createSlice({
  name: 'mitra',
  initialState:{
      namamitra:"",
      namatoko:"",
  },
  reducers: {
    setMitra: (state, action) => {
      state.namamitra = action.payload.namamitra;
      state.namatoko = action.payload.namatoko;
    }
  },
})

export const { setMitra } = mitraSlice.actions
export default mitraSlice.reducer