import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const TodosHome = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch("http://localhost:3000/todos");
      const data = await res.json();
      setTodos(data);
    };
    getTodos();
  }, []);
  return (
    <>
      {todos?.map((todo) => {
        return <Link to={`/todos/${todo.id}`}>{todo.title}</Link>;
      })}
    </>
  );
};
