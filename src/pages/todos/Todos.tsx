import { useGetTodosQuery } from "../../store/api/api";
import styles from "./Todos.module.css";

export const Todos = () => {
  const { data } = useGetTodosQuery();
  return (
    <div className={styles.todos_container}>
      {data?.map((todo) => {
        return <div key={todo.id}>{todo.title}</div>;
      })}
    </div>
  );
};
