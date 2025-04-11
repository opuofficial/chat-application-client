import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Recipient {
  _id: string;
  fullname: string;
  isOnline: boolean;
}

const initialState: Recipient = {
  _id: "",
  fullname: "",
  isOnline: false,
};

const recipientSlice = createSlice({
  name: "recipient",
  initialState,
  reducers: {
    setRecipient: (state, action: PayloadAction<Recipient>) => {
      state._id = action.payload._id;
      state.fullname = action.payload.fullname;
      state.isOnline = action.payload.isOnline;
    },
    updateActiveStatus: (
      state,
      action: PayloadAction<{ isOnline: boolean }>
    ) => {
      state.isOnline = action.payload.isOnline;
    },
  },
});

export const { setRecipient, updateActiveStatus } = recipientSlice.actions;
export default recipientSlice.reducer;
