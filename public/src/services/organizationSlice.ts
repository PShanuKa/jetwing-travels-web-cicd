import apiSlice from "./apiSlice";

const organizationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrganizations: builder.query({
      query: () => {
        return {
          url: `organizations`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllOrganizationsQuery } = organizationSlice;

export default organizationSlice;
