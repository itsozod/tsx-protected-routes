import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../../types/Types";

export const todosApi = createApi({
  reducerPath: "todos",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: ["Todos"],
    }),
    deleteTodos: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "DELETE",
        body: todo.id,
      }),
      invalidatesTags: ["Todos"],
    }),
    editTodos: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useDeleteTodosMutation,
  useEditTodosMutation,
} = todosApi;
