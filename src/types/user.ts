export interface User {
  _id: string;
  fullname: string;
  username: string;
  profilePicture: string;
}

export interface SearchUserResponse {
  message: string;
  users: User[];
}
