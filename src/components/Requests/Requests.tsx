import { Flex, Select } from "antd";
import { useSearchParams } from "react-router-dom";
import { RequestData } from "../RequestData/RequestData";
import {
  useLazyGetTodosRequestIdQuery,
  useLazyGetTodosRequestQuery,
} from "../../store/api/api";
import { useEffect } from "react";

export const Requests = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [getTodosRequest, { data }] = useLazyGetTodosRequestQuery();
  const [getTodosRequestId] = useLazyGetTodosRequestIdQuery();
  const mappedData = data?.map((todo) => ({
    value: todo.id,
    label: todo.title,
  }));
  const id = searchParams.get("id");
  console.log(id);

  useEffect(() => {
    getTodosRequest();
  }, [getTodosRequest]);

  return (
    <>
      <Flex vertical={true} justify="center" align="center">
        <Select
          style={{ width: "200px" }}
          options={mappedData}
          value={id}
          placeholder={"Choose a name"}
          onChange={(value) => {
            searchParams.set("id", value);
            setSearchParams(searchParams);
            getTodosRequestId(value);
          }}
        />
        <RequestData />
      </Flex>
    </>
  );
};
