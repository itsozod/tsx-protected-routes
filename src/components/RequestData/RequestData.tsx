import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const RequestData = () => {
  const [data, setData] = useState({});
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const getTodos = async () => {
      try {
        if (!id) {
          return;
        } else {
          const res = await fetch(`http://localhost:3000/todos/${id}`);
          const data = await res.json();
          setData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getTodos();
  }, [id]);

  return (
    <div>
      <p>{data.id}</p>
      <p>{data.title}</p>
      <p>{JSON.stringify(data.done)}</p>
    </div>
  );
};
