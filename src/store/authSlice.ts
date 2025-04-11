import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: object | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (
      state,
      action: PayloadAction<{
        token: string;
        user: object;
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    userLogout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    updateProfilePicture: (
      state,
      action: PayloadAction<{ profilePicture: string }>
    ) => {
      state.user = {
        ...state.user,
        profilePicture: action.payload.profilePicture,
      };
    },
  },
});

export const { userLogin, userLogout, updateProfilePicture } =
  authSlice.actions;

export default authSlice.reducer;
