export interface User {
  id: string;
  fullname: string;
  username: string;
  email: string;
  profilePicture: string;
}

export interface AuthState {
  token: string;
  user: User;
  isAuthenticated: boolean;
}

export interface Conversation {
  _id: string;
  recipient: {
    _id: string;
    fullname: string;
    profilePicture: string;
    isOnline: boolean;
  };
  lastMessage: {
    _id: string;
    conversationId: string;
    sender: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  updatedAt: string;
  createdAt: string;
}

export interface GetRecipientProfileResponse {
  success: boolean;
  data: {
    _id: string;
    fullname: string;
    isOnline: boolean;
  };
}

export interface Message {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MessagesResponse {
  success: boolean;
  messages: Message[];
}
