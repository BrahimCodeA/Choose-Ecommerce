import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  _id: string;
  email: string;
  role: "admin" | "user";
  cart: CartItem[];
};

type CartItem = {
  productId: string;
  quantity: number;
  price: number;
};

type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  totalPrice: number;
};

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  totalPrice: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpRequest(state) {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = {
        _id: action.payload._id,
        email: action.payload.email,
        role: action.payload.role,
        cart: action.payload.cart || [],
      };
      state.error = null;
      state.totalPrice = calculateTotalPrice(action.payload.cart);
    },
    signUpFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    signInRequest(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = {
        ...action.payload,
        cart: action.payload.cart || [],
      };
      state.error = null;
      state.totalPrice = calculateTotalPrice(action.payload.cart);
    },
    signInFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser(state) {
      state.user = null;
      state.totalPrice = 0;
    },

    addToCart(state, action: PayloadAction<CartItem>) {
      if (state.user) {
        const itemIndex = state.user.cart.findIndex(
          (item) => item.productId === action.payload.productId
        );
        if (itemIndex >= 0) {
          state.user.cart[itemIndex].quantity += action.payload.quantity;
        } else {
          state.user.cart.push(action.payload);
        }
        state.totalPrice = calculateTotalPrice(state.user.cart);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.cart = state.user.cart.filter(
          (item) => item.productId !== action.payload
        );
        state.totalPrice = calculateTotalPrice(state.user.cart);
      }
    },
    updateCartItemQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        change: number;
      }>
    ) {
      if (state.user) {
        const itemIndex = state.user.cart.findIndex(
          (item) => item.productId === action.payload.productId
        );
        if (itemIndex >= 0) {
          const newQuantity =
            state.user.cart[itemIndex].quantity + action.payload.change;

          if (newQuantity > 0) {
            state.user.cart[itemIndex].quantity = newQuantity;
          }
        }
        state.totalPrice = calculateTotalPrice(state.user.cart);
      }
    },
  },
});

const calculateTotalPrice = (cart: CartItem[]) => {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

export const {
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signInRequest,
  signInSuccess,
  signInFailure,
  logoutUser,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} = userSlice.actions;

export default userSlice.reducer;
