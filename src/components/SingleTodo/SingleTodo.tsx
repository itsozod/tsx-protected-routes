import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Todo } from "../../types/Types";

export const SingleTodo = () => {
  const [todo, setTodos] = useState<Todo>({});
  const { todoId } = useParams();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch(`http://localhost:3000/todos/${todoId}`);
      const data = await res.json();
      setTodos(data);
      params.set("name", data.title);
      params.set("done", data.done);
      setParams(params);
    };
    getTodos();
  }, [todoId]);

  return (
    <>
      <div>{todo.title}</div>
    </>
  );
};
