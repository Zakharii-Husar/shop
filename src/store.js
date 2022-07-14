import { configureStore } from '@reduxjs/toolkit';
import fetchSlice from './components/fetchSlice';
import stateSlice from './components/stateSlice';

export const store = configureStore({
  reducer: {
    data: fetchSlice,
    section: stateSlice
  },
})