import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Layout } from "antd";
import { useDispatch } from "react-redux";
import {
  loggedOut,
  // removeToken,
} from "../../store/features/authAlice/authSlice";

export const HeaderUI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(loggedOut());
    navigate("/login", { replace: true });
  };
  const { Header } = Layout;

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
            <li className={styles.list}>
              <NavLink
                style={({ isActive }) => {
                  return isActive
                    ? { color: "#15cdfc", borderBottom: "2px solid white" }
                    : {};
                }}
                to={"/requests"}
              >
                Requests
              </NavLink>
            </li>
            <li className={styles.list}>
              <NavLink
                style={({ isActive }) => {
                  return isActive
                    ? { color: "#15cdfc", borderBottom: "2px solid white" }
                    : {};
                }}
                to={"/newRequests"}
              >
                New Requests
              </NavLink>
            </li>
          </ul>
        </nav>
        <Button onClick={logOut}>Log out</Button>
      </Header>
    </>
  );
};
