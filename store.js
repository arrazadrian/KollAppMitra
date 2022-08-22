import { configureStore } from '@reduxjs/toolkit';
import keranjangReducer from './src/features/keranjangSlice';
import mitraReducer from './src/features/mitraSlice';

export const store = configureStore({
  reducer: {
    keranjang: keranjangReducer,
    mitra: mitraReducer
  },
})