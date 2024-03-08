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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Hello");
    const obj = {
      email: username,
      password: password,
    };
    try {
      const result = await login(obj);
      dispatch(setToken(result.data.token));
      console.log(result.data.token);
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
