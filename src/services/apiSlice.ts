import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { store } from "@/store";
import { RootState } from "@/app/store";



const baseQuery = fetchBaseQuery({
  baseUrl: "https://f0mv977jk7.execute-api.ap-southeast-1.amazonaws.com/api/",
  prepareHeaders: (headers, { getState }) => {
    // Get the token from the Redux store
    const token = (getState() as RootState).auth.token; // Assuming token is stored in auth state
    const companyId = (getState() as RootState).meta.companySelected?.id;
    const userId = (getState() as RootState).auth.userInfo?.id;

    // If token exists, add it to the Authorization header
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    if (companyId) {
      headers.set("company-Id", `${companyId}`);
    }

    if (userId) {
      headers.set("user-Id", `${userId}`);
    }

    headers.set("access-control-allow-origin", "*");
    headers.set("access-control-allow-headers", "*");
    headers.set("access-control-allow-methods", "*");
    // headers.set("access-control-allow-credentials", "true");



    return headers;
  },
});

// const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:3000/api" });


const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["customers", "users", "Setting"],
});

export default apiSlice;
