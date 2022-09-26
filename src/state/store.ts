import { configureStore } from '@reduxjs/toolkit';
import fetchSlice from './fetchSlice';
import stateSlice from './stateSlice';

const store = configureStore({
  reducer: {
    data: fetchSlice,
    section: stateSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;