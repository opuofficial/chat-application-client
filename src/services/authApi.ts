import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiUrls from "../constants/apiUrls";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: apiUrls.signup,
        method: "POST",
        body: userData,
      }),
    }),
    sendOTP: builder.mutation({
      query: (userData) => ({
        url: apiUrls.sendOTP,
        method: "POST",
        body: userData,
      }),
    }),
    verifyOTP: builder.mutation({
      query: (userData) => ({
        url: apiUrls.verifyOTP,
        method: "POST",
        body: userData,
      }),
    }),
    signin: builder.mutation({
      query: (userData) => ({
        url: apiUrls.signin,
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useSigninMutation,
} = authApi;
