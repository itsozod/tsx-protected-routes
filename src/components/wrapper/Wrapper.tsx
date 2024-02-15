import { Content } from "antd/es/layout/layout";
import { HeaderUI } from "../header/Header";
import { PropsWithChildren } from "react";

export const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <HeaderUI />
      <Content style={{ display: "flex", justifyContent: "center" }}>
        {children}
      </Content>
    </div>
  );
};
