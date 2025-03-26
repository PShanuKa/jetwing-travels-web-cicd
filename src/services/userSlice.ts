import apiSlice from "./apiSlice";

const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "auth",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        const { id, ...rest } = data;
        return {
          url: `auth/${id}`,
          method: "PUT",
          body: rest,
        };
      },
      invalidatesTags: ["users"],
    }),
    getAllUsers: builder.query({
      query: () => {
        return {
          url: `auth`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
  }),
});

export const { useCreateUserMutation, useGetAllUsersQuery, useUpdateUserMutation } = userSlice;

export default userSlice;
