import { Button, Flex, Form, Input, Typography } from "antd";
import styles from "./Login.module.css";
// import { useLoginMutation } from "../../store/api/authApi";
import { useDispatch } from "react-redux";
import { setRefresh, setToken } from "../../store/features/authAlice/authSlice";
import { useNavigate } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginApi } from "../../store/api/loginApi";
const { useLoginMutation } = LoginApi;

export type FormData = {
  username: string;
  password: string;
};
// const login = async (obj) => {
//   const res = await fetch("https://dummyjson.com/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(obj),
//   });
//   const data = await res.json();
//   return data;
// };
export const Login = () => {
  const schema: ZodType<FormData> = z.object({
    username: z.string(),
    password: z.string().min(5).max(10),
  });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<FormData>({
    // defaultValues: { email: "eve.holt@reqres.in", password: "cityslicka" },
    defaultValues: { username: "emilys", password: "emilyspass" },
    resolver: zodResolver(schema),
  });

  const handleLogin = async (datas: FormData) => {
    console.log("Hello", datas);
    try {
      const result = await login({
        username: datas.username,
        password: datas.password,
        expiresInMins: 1,
      });
      dispatch(setToken(result.data.token));
      dispatch(setRefresh(result.data.refreshToken)); 
      console.log(result);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.login}>
      <Flex
        vertical={true}
        justify="center"
        align="center"
        style={{ border: "1px solid black", padding: "15px" }}
      >
        <Typography.Title>Login</Typography.Title>
        <Form onFinish={handleSubmit(handleLogin)} className={styles.form}>
          <FormItem control={control} name="username" style={{ width: "100%" }}>
            <Input
              className={styles.input}
              type="text"
              placeholder="Enter your email"
            ></Input>
          </FormItem>
          <FormItem control={control} name="password" style={{ width: "100%" }}>
            <Input.Password
              className={styles.input}
              placeholder="Enter your password"
            ></Input.Password>
          </FormItem>
          <Form.Item>
            <Button
              style={{ width: "100%" }}
              htmlType="submit"
              loading={isLoading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
};
