import { Button } from "antd";
import { useGetTodosQuery } from "../../store/api/api";
import styles from "./Todos.module.scss";

export const Todos = () => {
  const { data } = useGetTodosQuery();
  return (
    <div className={styles.todos_container}>
      {data?.map((todo) => {
        return (
          <div className={styles.todo_card} key={todo.id}>
            <p>{todo.title}</p>
            <Button className={styles.todo_card__edit_btn}>Edit</Button>
            <Button className={styles.todo_card__delete_btn}>Delete</Button>
          </div>
        );
      })}
    </div>
  );
};
