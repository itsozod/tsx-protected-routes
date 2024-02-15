import { ReactNode } from "react";

export type IsAuth = {
  isAuth: boolean | string;
};

export type UserSlice = {
  user: IsAuth;
};
export type ProtectedLoginProps = {
  onlyFor: boolean | string;
  children: ReactNode;
};

export type ProtectedRouteProps = {
  onlyFor: boolean | string;
};

export type Todo = {
  id: string;
  title: string;
  done: boolean;
};
