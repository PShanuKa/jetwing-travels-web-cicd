import apiSlice from "./apiSlice";


const customerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCustomer: builder.mutation({
      query: (data) => ({
        url: "customers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["customers"],
    }),
    getAllCustomers: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return {
          url: `customers/filter?${queryParams}`,
          method: "GET",
        };
      },
      providesTags: ["customers"],
    }),
    getUpdatedCustomers: builder.mutation({
      query: (data) => ({
        url: `customers/${data.id}`,
        method: "PUT",
        body: data.formData,
      }),
      invalidatesTags: ["customers"],
    }),
  }),
});

    



export const { useAddCustomerMutation, useGetAllCustomersQuery, useGetUpdatedCustomersMutation } = customerSlice;

export default customerSlice;


