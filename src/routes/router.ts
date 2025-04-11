import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import { FC } from "react";
import VerifyEmail from "../pages/auth/VerifyEmail";
import Home from "../pages/home/Home";
import Conversation from "../components/Conversation";
import Profile from "../pages/profile/Profile";

interface RouteType {
  path: string;
  element: FC;
}

export const publicRoutes: RouteType[] = [
  {
    path: "/auth/signup",
    element: Signup,
  },
  {
    path: "/auth/signin",
    element: Signin,
  },
  {
    path: "/auth/verify-email",
    element: VerifyEmail,
  },
];

export const protectedRoutes: RouteType[] = [
  {
    path: "/messages",
    element: Home,
  },
  {
    path: "/messages/:recipientId",
    element: Conversation,
  },
  {
    path: "/profile",
    element: Profile,
  },
];
