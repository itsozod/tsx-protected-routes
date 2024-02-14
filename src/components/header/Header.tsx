import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Layout } from "antd";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../store/userSlice/userSlice";

export const HeaderUI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    localStorage.removeItem("auth");
    navigate("/login", { replace: true });
    dispatch(logOutUser(false));
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
          </ul>
        </nav>
        <Button onClick={logOut}>Log out</Button>
      </Header>
    </>
  );
};
