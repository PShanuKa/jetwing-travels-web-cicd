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
      query: (data) => {
        const { page, size, role, organizationId, searchString } = data;

        let url = `page=${page}&size=${size}`;

        if (role) {
          url += `&role=${role}`;
        }

        if (organizationId) {
          url += `&organizationId=${organizationId}`;
        }

        if (searchString) {
          url += `&searchText=${searchString}`;
        }

        return {
          url: `auth?${url}`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} = userSlice;

export default userSlice;
