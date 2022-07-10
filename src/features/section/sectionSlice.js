import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    favourite: [],
    cart: []
};

export const sectionSlice = createSlice({
    name: 'section',
    initialState,
    reducers: {
        add: (state, action) => {
            state.cart.push({...action.payload, quantity: 1})
        },
        increaseQuantity: (state, action) =>{
            state.cart[action.payload].quantity += 1
        },
        remove: (state, action) => {
            state.cart.splice(action.payload, 1)
        },
        decreaseQuantity: (state, action) => {
            state.cart[action.payload].quantity -= 1
        },
        like: (state, action) => {
            state.favourite.push(action.payload);
        },
        unlike: (state, action) => {
            state.favourite = state.favourite.filter(item => item.brand + item.model !==
                action.payload.brand + action.payload.model)
        }
    },
})

export const { like, unlike, add, increaseQuantity, remove, decreaseQuantity } = sectionSlice.actions

export default sectionSlice.reducer


