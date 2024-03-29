import { createSlice } from "@reduxjs/toolkit";

type obj = {
    quantity: number;
    price: number;
    brand: string;
    model: string;
  };

interface stateType {
  favourite: obj[];
  cart: obj[];
  input: string;
}

const initialState: stateType = {
  favourite: [],
  cart: [],
  input: "",
};

export const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    add: (state, action) => {
      state.cart.push({ ...action.payload, quantity: 1 });
    },
    increaseQuantity: (state, action) => {
      state.cart[action.payload].quantity += 1;
    },
    remove: (state, action) => {
      state.cart.splice(action.payload, 1);
    },
    decreaseQuantity: (state, action) => {
      state.cart[action.payload].quantity -= 1;
    },
    like: (state, action) => {
      state.favourite.push(action.payload);
    },
    unlike: (state, action) => {
      state.favourite = state.favourite.filter(
        (item) =>
          item.brand + item.model !==
          action.payload.brand + action.payload.model
      );
    },
    search: (state, action) => {
      state.input = action.payload;
    },
  },
});

export const {
  like,
  unlike,
  add,
  increaseQuantity,
  remove,
  decreaseQuantity,
  search,
} = sectionSlice.actions;

export default sectionSlice.reducer;
