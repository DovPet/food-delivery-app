import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  orderWasPlaced: false
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setOrderWasPlaced: (state) => {
      state.orderWasPlaced = true;
    },
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `You cannot remove item with id ${action.payload.id} because it is not in your basket`
        );
      }

      state.items = newBasket;
    },
    emptyBasket: (state) => {
      state.items = [];
    }
  }
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, setOrderWasPlaced, emptyBasket } =
  basketSlice.actions;

export const selectedBasketItems = (state) => state.basket.items;
export const getOrderWasPlaced = (state) => state.basket.orderWasPlaced;
export const selectedBasketItemsById = (state, id) =>
  state.basket.items.filter((item) => item.id === id);
export const selectedBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;
