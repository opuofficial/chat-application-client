import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiUrls from "../constants/apiUrls";
import { RootState } from "../store/store";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfileData: builder.query({
      query: () => ({
        url: apiUrls.getProfileData,
      }),
      providesTags: ["Profile"],
    }),

    uploadProfilePicture: builder.mutation({
      query: (formData) => ({
        url: apiUrls.uploadProfilePicture,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileDataQuery, useUploadProfilePictureMutation } =
  profileApi;
