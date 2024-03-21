export type IsAuth = {
  isAuth: boolean | string;
};

export type UserSlice = {
  user: IsAuth;
};

export type ProtectedRouteProps = {
  onlyFor: null | string;
};

export type Todo = {
  id: string;
  title: string;
  done: boolean;
};
