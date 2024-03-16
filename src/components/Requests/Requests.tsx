import { Flex, Select } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RequestData } from "../RequestData/RequestData";

export const Requests = () => {
  const [todos, setTodos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch("http://localhost:3000/todos");
      const data = await res.json();
      const mappedData = data.map((todo) => ({
        value: todo.id,
        label: todo.title,
      }));
      setTodos(mappedData);
    };
    getTodos();
  }, []);
  const id = searchParams.get("id");
  console.log(id);
  return (
    <>
      <Flex vertical={true} justify="center" align="center">
        <Select
          style={{ width: "200px" }}
          options={todos}
          value={id}
          placeholder={"Choose a name"}
          onChange={(value) => {
            searchParams.set("id", value);
            setSearchParams(searchParams);
          }}
        />
        <RequestData />
      </Flex>
    </>
  );
};
