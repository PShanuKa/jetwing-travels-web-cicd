import apiSlice from "./apiSlice";

const invoiceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query: (data) => ({
        url: "invoice/add-new-invoice",
        method: "POST",
        body: data,
      }),
    }),
    getAllInvoices: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return {
          url: `invoice/filters?${queryParams}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCreateInvoiceMutation, useGetAllInvoicesQuery } = invoiceSlice;

export default invoiceSlice;
