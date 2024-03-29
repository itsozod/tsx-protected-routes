import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Todo } from "../../types/Types";

export const TodosHome = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

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
        return (
          <Link key={todo?.id} to={`/todos/${todo?.id}`}>
            {todo?.title}
          </Link>
        );
      })}
    </>
  );
};
