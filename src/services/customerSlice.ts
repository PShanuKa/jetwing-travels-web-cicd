import apiSlice from "./apiSlice";

const customerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCustomer: builder.mutation({
      query: (data) => ({
        url: "customers/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["customers"],
    }),
    getAllCustomers: builder.query({
      query: (params) => {
        const companySelected = localStorage.getItem("companySelected");
        let companyId = "";
        if (companySelected) {
          try {
            const parsedData = JSON.parse(companySelected);
            companyId = parsedData.id;
          } catch (error) {
            console.error("Error parsing company data", error);
          }
        }
        const queryParams = new URLSearchParams({
          ...params,
          CompanyId: companyId,
        }).toString();
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

export const {
  useAddCustomerMutation,
  useGetAllCustomersQuery,
  useGetUpdatedCustomersMutation,
} = customerSlice;

export default customerSlice;
