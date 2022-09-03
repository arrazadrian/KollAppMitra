import { createSlice } from '@reduxjs/toolkit'

export const mitraSlice = createSlice({
  name: 'mitra',
  initialState:{
      namamitra:"",
  },
  reducers: {
    setMitra: (state, action) => {
      state.namamitra = action.payload.namamitra;
    }
  },
})

export const { setMitra } = mitraSlice.actions
export default mitraSlice.reducer