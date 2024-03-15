import { Button, Flex, Input } from "antd";
import {
  useDeleteTodosMutation,
  useCheckTodosMutation,
  useGetTodosQuery,
  useEditTodosMutation,
} from "../../store/api/api";
import styles from "./Todos.module.scss";
import { useState } from "react";
import { Todo } from "../../types/Types";
import { AddTodo } from "../../components/addTodo/AddTodo";
import { TodosHome } from "../../components/todosHome/TodosHome";

export const Todos = () => {
  const [edit, setEdit] = useState<null | string>(null);
  const [editValue, setEditValue] = useState<string>("");
  const { data } = useGetTodosQuery();
  const [checkTodo] = useCheckTodosMutation();
  const [editTodo] = useEditTodosMutation();
  const [deleteTodo] = useDeleteTodosMutation();

  const getEditValue = (todo: Todo) => {
    setEditValue(todo.title);
    setEdit(todo.id);
  };

  const submitTodo = (todo: Todo) => {
    editTodo({ ...todo, title: editValue });
    setEdit(null);
  };

  return (
    <Flex className={styles.full_container}>
      <AddTodo />
      <div className={styles.todos_container}>
        {data?.map((todo) => {
          return (
            <div className={styles.todo_card} key={todo.id}>
              {edit === todo.id ? (
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                ></Input>
              ) : (
                <p
                  style={{
                    textDecoration: todo.done ? "line-through" : "none",
                  }}
                  onClick={() => checkTodo({ ...todo, done: !todo.done })}
                  className={styles.todo_title}
                >
                  {todo.title}
                </p>
              )}

              <div className={styles.button_container}>
                {edit === todo.id ? (
                  <>
                    <Button onClick={() => setEdit(null)}>Cancel</Button>
                    <Button onClick={() => submitTodo(todo)}>Add</Button>
                  </>
                ) : (
                  <>
                    <Button
                      className={styles.edit_btn}
                      onClick={() => getEditValue(todo)}
                    >
                      Edit
                    </Button>
                    <Button
                      className={styles.delete_btn}
                      onClick={() => deleteTodo(todo)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
        <TodosHome />
      </div>
    </Flex>
  );
};
