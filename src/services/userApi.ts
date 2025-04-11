import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiUrls from "../constants/apiUrls";
import { RootState } from "../store/store";
import { SearchUserResponse } from "../types/user";
import { GetRecipientProfileResponse, MessagesResponse } from "../types/types";

export const userApi = createApi({
  reducerPath: "userApi",
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
  endpoints: (builder) => ({
    searchUser: builder.query<SearchUserResponse, { keyword: string }>({
      query: ({ keyword }) => ({
        url: `${apiUrls.searchUser}/?keyword=${keyword}`,
      }),
    }),
    getConversations: builder.query({
      query: () => ({
        url: apiUrls.getConversations,
      }),
    }),
    getRecipientProfile: builder.query<GetRecipientProfileResponse, unknown>({
      query: (userId) => ({
        url: `${apiUrls.getRecipientProfile}/${userId}`,
      }),
    }),
    getMessagesByRecipientId: builder.query<MessagesResponse, unknown>({
      query: (userId) => ({
        url: `${apiUrls.getMessagesByRecipientId}/${userId}`,
      }),
    }),
  }),
});

export const {
  useSearchUserQuery,
  useGetConversationsQuery,
  useGetRecipientProfileQuery,
  useGetMessagesByRecipientIdQuery,
} = userApi;
