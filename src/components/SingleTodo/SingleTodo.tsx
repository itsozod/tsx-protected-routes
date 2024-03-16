import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export const SingleTodo = () => {
  const [todo, setTodos] = useState({});
  const { todoId } = useParams();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch(`http://localhost:3000/todos/${todoId}`);
      const data = await res.json();
      setTodos(data);
    };
    getTodos();
  }, [todoId]);

  return (
    <>
      <div
        onClick={() => {
          params.set("name", todo.title);
          setParams(params);
        }}
      >
        {todo.title}
      </div>
    </>
  );
};
