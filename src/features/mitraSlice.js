import { createSlice } from '@reduxjs/toolkit'

export const mitraSlice = createSlice({
  name: 'mitra',
  initialState:{
      id_mitra:"",
      namamitra:"",
  },
  reducers: {
    setMitra: (state, action) => {
      state.id_mitra = action.payload.id_mitra;
      state.namamitra = action.payload.namamitra;
    }
  },
})

export const { setMitra } = mitraSlice.actions
export default mitraSlice.reducer