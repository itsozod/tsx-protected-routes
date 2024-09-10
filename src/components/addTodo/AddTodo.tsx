import { Button, Flex, Input } from "antd";
import styles from "./AddTodo.module.css";
import { useState } from "react";
// import { useAddTodosMutation } from "../../store/api/api";

export const AddTodo = () => {
  const [todoValue, setTodoValue] = useState<string>("");
  // const [addTodo] = useAddTodosMutation();

  const submitTodo = () => {
    if (todoValue.trim() !== "") {
      const newTodo = {
        title: todoValue,
        done: false,
      };
      addTodo(newTodo);
    }
  };
  return (
    <Flex className={styles.add_container}>
      <Input
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
        placeholder="Enter todo name"
      ></Input>
      <Button onClick={() => submitTodo()}>Submit</Button>
    </Flex>
  );
};
