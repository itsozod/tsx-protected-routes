import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { Button, Layout } from "antd";
import { MouseEventHandler } from "react";

type ButtonProp = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const HeaderUI = ({ onClick }: ButtonProp) => {
  const { Header } = Layout;
  const user = localStorage.getItem("user");
  return (
    <>
      <Header className={styles.header}>
        <nav>
          <ul className={styles.ul_header}>
            <li className={styles.list}>
              <NavLink
                style={({ isActive }) => {
                  return isActive
                    ? { color: "#15cdfc", borderBottom: "2px solid white" }
                    : {};
                }}
                to={"/"}
              >
                Home
              </NavLink>
            </li>
            <li className={styles.list}>
              <NavLink
                style={({ isActive }) => {
                  return isActive
                    ? { color: "#15cdfc", borderBottom: "2px solid white" }
                    : {};
                }}
                to={"/todos"}
              >
                Todos
              </NavLink>
            </li>
            {user && <Button onClick={onClick}>Log out</Button>}
          </ul>
        </nav>
      </Header>
    </>
  );
};
