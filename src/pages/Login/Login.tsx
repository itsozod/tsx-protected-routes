import { Button, Form, Input } from "antd";
import styles from "./Login.module.css";
import { ChangeEventHandler, MouseEventHandler } from "react";
export type props = {
  onClick: MouseEventHandler;
  onChange: ChangeEventHandler;
  value: string;
};

export const Login = ({ onClick, onChange, value }: props) => {
  return (
    <div className={styles.login}>
      <Form className={styles.form}>
        <Input
          className={styles.input}
          type="text"
          placeholder="Enter your username"
          value={value}
          onChange={onChange}
        ></Input>
        <Input
          className={styles.input}
          type="password"
          placeholder="Enter your password"
        ></Input>
        <Button onClick={onClick}>Log in</Button>
      </Form>
    </div>
  );
};
