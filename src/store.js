import { configureStore } from '@reduxjs/toolkit';
import fetchSlice from './features/fetch/fetchSlice';
import sectionSlice from './features/section/sectionSlice';

export const store = configureStore({
  reducer: {
    data: fetchSlice,
    section: sectionSlice
  },
})