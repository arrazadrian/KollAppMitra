import { configureStore } from '@reduxjs/toolkit';
import keranjangReducer from './src/features/keranjangSlice';

export const store = configureStore({
  reducer: {
    keranjang: keranjangReducer
  },
})