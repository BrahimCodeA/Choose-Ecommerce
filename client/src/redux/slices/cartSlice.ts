import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  originalPrice: number;
  isDiscounted: boolean;
  discountAmount: number;
};

type CartState = {
  cart: CartItem[];
};

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.cart = action.payload;
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.cart.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );
    },
    updateCartItemQuantity(
      state,
      action: PayloadAction<{ productId: string; change: number }>
    ) {
      const item = state.cart.find(
        (item) => item.productId === action.payload.productId
      );
      if (item) {
        const newQuantity = item.quantity + action.payload.change;
        if (newQuantity >= 1) {
          item.quantity = newQuantity;
        }
      }
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateCartItemQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
