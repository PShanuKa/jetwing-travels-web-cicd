import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { store } from "@/store";
import { RootState } from "@/app/store";



const baseQuery = fetchBaseQuery({
  baseUrl: "http://103.214.111.82:8082/api",
  prepareHeaders: (headers, { getState }) => {
    // Get the token from the Redux store
    const token = (getState() as RootState).auth.token; // Assuming token is stored in auth state
    const companyId = (getState() as RootState).meta.companySelected;
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
