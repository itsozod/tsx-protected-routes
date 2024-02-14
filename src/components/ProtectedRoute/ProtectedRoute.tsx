import { Navigate, Outlet } from "react-router-dom";
import { Wrapper } from "../wrapper/Wrapper";
import { ProtectedRouteProps } from "../../types/Types";

export const ProtectedRoute = ({ onlyFor }: ProtectedRouteProps) => {
  return onlyFor ? (
    <Wrapper>
      <Outlet />
    </Wrapper>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
