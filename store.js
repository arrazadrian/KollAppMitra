import { configureStore } from '@reduxjs/toolkit';
import keranjangReducer from './src/features/keranjangSlice';
import mitraReducer from './src/features/mitraSlice';
import pelangganReducer from './src/features/pelangganSlice';
import kategoriReducer from './src/features/kategoriSlice';
import mangkalReducer from './src/features/mangkalSlice';

export const store = configureStore({
  reducer: {
    keranjang: keranjangReducer,
    mitra: mitraReducer,
    pelanggan: pelangganReducer,
    kategori: kategoriReducer,
    mangkal: mangkalReducer,
  },
});