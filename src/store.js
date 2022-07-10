import { configureStore } from '@reduxjs/toolkit';
import fetchSlice from './components/fetchSlice';
import sectionSlice from './components/stateSlice';

export const store = configureStore({
  reducer: {
    data: fetchSlice,
    section: sectionSlice
  },
})