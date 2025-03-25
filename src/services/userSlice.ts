import apiSlice from "./apiSlice";

const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "auth",
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: () => {
        return {
          url: `auth`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCreateUserMutation, useGetAllUsersQuery } = userSlice;

export default userSlice;
