import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  email: string;
  role: "admin" | "user";
};

type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
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
      state.user = action.payload;
      state.error = null;
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
      state.user = action.payload;
      state.error = null;
    },
    signInFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser(state) {
      state.user = null;
    },
  },
});

export const {
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signInRequest,
  signInSuccess,
  signInFailure,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
