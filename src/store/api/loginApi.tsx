import { api } from "./authApi";

export const LoginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    Login: builder.mutation<any, any>({
      query: (params) => {
        return {
          url: "auth/login",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        };
      },
      async onQueryStarted({ queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.token);
          localStorage.setItem("refreshToken", data.refreshToken);
        } catch (error) {
          console.error("Login failed", error);
        }
      },
    }),
  }),
});
