import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { loggedOut, setToken } from "../features/authAlice/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dummyjson.com",
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Log token refresh attempt
    console.log("Token expired, attempting to refresh");

    // try to get a new token
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "auth/refresh",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken, expiresInMins: 1 }),
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Log successful token refresh
        console.log("Token refreshed successfully");

        // store the new token in the store or wherever you keep it
        localStorage.setItem("token", refreshResult.data.token);
        api.dispatch(setToken(refreshResult.data.token));

        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Log refresh failure
        console.log("Token refresh failed");
        // refresh failed - do something like redirect to login or show a "retry" button
        api.dispatch(loggedOut());
      }
    } else {
      api.dispatch(loggedOut());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
