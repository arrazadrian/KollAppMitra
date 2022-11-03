import { configureStore } from '@reduxjs/toolkit';
import keranjangReducer from './src/features/keranjangSlice';
import mitraReducer from './src/features/mitraSlice';
import pelangganReducer from './src/features/pelangganSlice';
import kategoriReducer from './src/features/kategoriSlice';
import mangkalReducer from './src/features/mangkalSlice';
import counterReducer from './src/features/counterSlice';
import posisiReducer from './src/features/posisiSlice';
import bobotReducer from './src/features/bobotSlice';
import voucherReducer from './src/features/voucherSlice';
import datapmReducer from './src/features/datapmSlice';

export const store = configureStore({
  reducer: {
    keranjang: keranjangReducer,
    mitra: mitraReducer,
    pelanggan: pelangganReducer,
    kategori: kategoriReducer,
    mangkal: mangkalReducer,
    counter: counterReducer,
    posisi: posisiReducer,
    bobot: bobotReducer,
    voucher: voucherReducer,
    datapm: datapmReducer,
  },
});