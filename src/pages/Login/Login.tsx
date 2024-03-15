import { Button, Form, Input } from "antd";
import styles from "./Login.module.css";
import { useState } from "react";
import { useLoginMutation } from "../../store/api/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/features/authAlice/authSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Hello");
    try {
      const result = await login({ username, password });
      dispatch(setToken(result.data.token));
      console.log(result);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.login}>
      <Form className={styles.form}>
        <Input
          className={styles.input}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        ></Input>
        <Input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        ></Input>
        <Button loading={isLoading} onClick={handleLogin}>
          Log in
        </Button>
      </Form>
    </div>
  );
};
