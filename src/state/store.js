import { configureStore } from '@reduxjs/toolkit';
import fetchSlice from './fetchSlice';
import stateSlice from './stateSlice';

export const store = configureStore({
  reducer: {
    data: fetchSlice,
    section: stateSlice
  },
})