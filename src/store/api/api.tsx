import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../../types/Types";

export const todosApi = createApi({
  reducerPath: "todos",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    // get request to get todos
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: ["Todos"],
    }),
    getTodosRequest: builder.query<Todo[], void>({
      query: () => "/todos",
    }),
    getTodosRequestId: builder.query<Todo[], string>({
      query: (id) => `todos/${id}`,
    }),
    // post request to post a todo
    addTodos: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    // delete request to delete a specific todo
    deleteTodos: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "DELETE",
        body: todo.id,
      }),
      invalidatesTags: ["Todos"],
    }),
    // put request to edit the specific todo from read to unread or vice verca
    checkTodos: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    // put request to edit the name of the specific todo
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
  useCheckTodosMutation,
  useEditTodosMutation,
  useAddTodosMutation,
  useLazyGetTodosRequestQuery,
  useLazyGetTodosRequestIdQuery,
} = todosApi;
