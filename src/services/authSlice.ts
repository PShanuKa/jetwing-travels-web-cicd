import apiSlice from "./apiSlice";


const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({ query: (data) => ({ url: "/auth/admin/login", method: "POST", body: data }) }),
  }),
});

export const { useLoginMutation } = authSlice;

export default authSlice;
