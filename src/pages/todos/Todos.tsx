import { Button, Input } from "antd";
import {
  useDeleteTodosMutation,
  useCheckTodosMutation,
  useGetTodosQuery,
  useEditTodosMutation,
} from "../../store/api/api";
import styles from "./Todos.module.scss";
import { useState } from "react";
import { Todo } from "../../types/Types";

export const Todos = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>("");
  const { data } = useGetTodosQuery();
  const [checkTodo] = useCheckTodosMutation();
  const [editTodo] = useEditTodosMutation();
  const [deleteTodo] = useDeleteTodosMutation();

  const getEditValue = (title: string) => {
    setEditValue(title);
    setEdit(true);
  };

  const submitTodo = (todo: Todo) => {
    editTodo({ ...todo, title: editValue });
    setEdit(false);
  };

  return (
    <div className={styles.todos_container}>
      {data?.map((todo) => {
        return (
          <div className={styles.todo_card} key={todo.id}>
            {edit ? (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              >
                {/* {todo.title} */}
              </Input>
            ) : (
              <p
                style={{ textDecoration: todo.done ? "line-through" : "none" }}
                onClick={() => checkTodo({ ...todo, done: !todo.done })}
                className={styles.todo_title}
              >
                {todo.title}
              </p>
            )}

            <div className={styles.button_container}>
              {edit ? (
                <Button onClick={() => submitTodo(todo)}>Submit</Button>
              ) : (
                <Button
                  className={styles.edit_btn}
                  onClick={() => getEditValue(todo.title)}
                >
                  Edit
                </Button>
              )}

              <Button
                className={styles.delete_btn}
                onClick={() => deleteTodo(todo)}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
