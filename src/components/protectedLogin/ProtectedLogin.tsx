import { Navigate } from "react-router-dom";
import { ProtectedLoginProps } from "../../types/Types";

export const ProtectedLogin = ({ onlyFor, children }: ProtectedLoginProps) => {
  return onlyFor ? <Navigate to="/" /> : children;
};
