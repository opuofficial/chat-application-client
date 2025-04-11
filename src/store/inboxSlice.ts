import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../types/types";

const initialState: Message[] = [];

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    setInbox: (_, action: PayloadAction<Message[]>) => {
      return action.payload;
    },
    appendToInbox: (state, action: PayloadAction<Message>) => {
      state.push(action.payload);
    },
  },
});

export const { setInbox, appendToInbox } = inboxSlice.actions;
export default inboxSlice.reducer;
