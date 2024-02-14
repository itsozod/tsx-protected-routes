import { HeaderUI } from "../header/Header";

export const Wrapper = ({ children }) => {
  return (
    <div>
      <HeaderUI />
      <div>{children}</div>
    </div>
  );
};
