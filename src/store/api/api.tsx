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
    getTest: builder.query<any, any>({
      query: (params) => {
        return {
          url: `https://jsonplaceholder.typicode.com/posts?_page=${params?.page}`,
          method: "GET",
        };
      },
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs };
        if (newQueryArgs.page) {
          delete newQueryArgs.page;
        }
        return newQueryArgs;
      },
      merge: (currentCache, newItems) => {
        if (currentCache) {
          return [...currentCache, ...newItems];
        } else return [...newItems];
      },

      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    // getTodosRequest: builder.query<Todo[], void>({
    //   query: () => "/todos",
    //   providesTags: ["Todos"],
    // }),
    // getTodosRequestId: builder.query<Todo, string>({
    //   query: (id) => `todos/${id}`,
    //   providesTags: ["Todos"],
    // }),

    // // post request to post a todo
    // addTodos: builder.mutation({
    //   query: (todo) => ({
    //     url: "/todos",
    //     method: "POST",
    //     body: todo,
    //   }),
    //   invalidatesTags: ["Todos"],
    // }),
    // // delete request to delete a specific todo
    // deleteTodos: builder.mutation({
    //   query: (todo) => ({
    //     url: `/todos/${todo.id}`,
    //     method: "DELETE",
    //     body: todo.id,
    //   }),
    //   invalidatesTags: ["Todos"],
    // }),
    // // put request to edit the specific todo from read to unread or vice verca
    // checkTodos: builder.mutation({
    //   query: (todo) => ({
    //     url: `/todos/${todo.id}`,
    //     method: "PUT",
    //     body: todo,
    //   }),
    //   invalidatesTags: ["Todos"],
    // }),
    // // put request to edit the name of the specific todo
    // editTodos: builder.mutation({
    //   query: (todo) => ({
    //     url: `/todos/${todo.id}`,
    //     method: "PUT",
    //     body: todo,
    //   }),
    //   invalidatesTags: ["Todos"],
    // }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTestQuery,
  // useDeleteTodosMutation,
  // useCheckTodosMutation,
  // useEditTodosMutation,
  // useAddTodosMutation,
  // useLazyGetTodosRequestQuery,
  // useLazyGetTodosRequestIdQuery,
} = todosApi;
