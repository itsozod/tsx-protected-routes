import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SingleTodo = () => {
  const [todo, setTodos] = useState({});
  const { todoId } = useParams();

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
      <p>{todo.title}</p>
    </>
  );
};
