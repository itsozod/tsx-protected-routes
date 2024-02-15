import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../../types/Types";

export const todosApi = createApi({
  reducerPath: "todos",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
    }),
  }),
});

export const { useGetTodosQuery } = todosApi;
