import { api } from "./authApi";

export const UsersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => {
        return {
          url: "users",
        };
      },
    }),
  }),
});
