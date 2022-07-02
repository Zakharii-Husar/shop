import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const fetchSlice = createSlice({
    name: 'fetch',
    initialState,
    reducers: {
        fetchJSON: (state, action) => {
           return {...state, ...action.payload}
        }
    },
});

export const { fetchJSON } = fetchSlice.actions

export default fetchSlice.reducer