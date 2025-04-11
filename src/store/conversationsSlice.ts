import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Conversation {
  _id: string;
  recipient: {
    _id: string;
    fullname: string;
    profilePicture: string;
    isOnline: boolean;
  };
  lastMessage: string;
}

const initialState: Conversation[] = [];

const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setConversations: (_, action: PayloadAction<Conversation[]>) => {
      return action.payload;
    },
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.unshift(action.payload);
    },
    updateLastMessage: (
      state,
      action: PayloadAction<{ _id: string; lastMessage: string }>
    ) => {
      state.forEach((conversation) => {
        if (conversation._id == action.payload._id) {
          conversation.lastMessage = action.payload.lastMessage;
        }
      });
    },
    updateOnlineStatus: (
      state,
      action: PayloadAction<{ _id: string; isOnline: boolean }>
    ) => {
      const conversation = state.find(
        (c) => c.recipient._id == action.payload._id
      );

      if (conversation) {
        conversation.recipient.isOnline = action.payload.isOnline;
      }
    },
  },
});

export const {
  setConversations,
  addConversation,
  updateLastMessage,
  updateOnlineStatus,
} = conversationSlice.actions;

export default conversationSlice.reducer;
