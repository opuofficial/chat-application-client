import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { profileApi } from "../services/profileApi";
import { userApi } from "../services/userApi";
import authReducer from "./authSlice";
import conversationsReducer from "./conversationsSlice";
import recipientReducer from "./recipientSlice";
import inboxReducer from "./inboxSlice";
import { AuthState } from "../types/types";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    conversations: conversationsReducer,
    recipient: recipientReducer,
    inbox: inboxReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(profileApi.middleware)
      .concat(userApi.middleware),
});

export interface RootState {
  auth: AuthState;
}
