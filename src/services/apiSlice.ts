import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "http://103.214.111.82:8082/api" });
// const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:3000/api" });


const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["customers"],
});

export default apiSlice;
