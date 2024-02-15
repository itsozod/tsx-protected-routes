import { Button } from "antd";
import {
  useDeleteTodosMutation,
  useEditTodosMutation,
  useGetTodosQuery,
} from "../../store/api/api";
import styles from "./Todos.module.scss";
// import { useDispatch } from "react-redux";

export const Todos = () => {
  const { data } = useGetTodosQuery();
  const [editTodo] = useEditTodosMutation();
  const [deleteTodo] = useDeleteTodosMutation();
  return (
    <div className={styles.todos_container}>
      {data?.map((todo) => {
        return (
          <div className={styles.todo_card} key={todo.id}>
            <p
              style={{ textDecoration: todo.done ? "line-through" : "none" }}
              onClick={() => editTodo({ ...todo, done: !todo.done })}
              className={styles.todo_title}
            >
              {todo.title}
            </p>
            <div className={styles.button_container}>
              <Button className={styles.edit_btn}>Edit</Button>
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
