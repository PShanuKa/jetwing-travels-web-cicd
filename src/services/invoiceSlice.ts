import apiSlice from "./apiSlice";



const invoiceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query: (data) => ({
        url: "invoice/add-new-invoice",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["invoice"],
    }),
    getAllInvoices: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return {
          url: `invoice/filters?${queryParams}`,
          method: "GET",
        };
      },
      providesTags: ["invoice"],
    }),
    ganaratePaymentLink: builder.mutation({
      query: ({id, email}) => ({
        url: `invoice/generate-link/${id}/${email}`,
        method: "POST",
      }),
      invalidatesTags: ["invoice"],
    }),
    getCurrency: builder.query({
      query: ({organizationId}) => ({
        url: `currency/organization/${organizationId}`,
        method: "GET",
      }),
    }),
    existingCustomer: builder.query({
      query: ({searchString}) => ({
        url: `invoice/existing-customer/${searchString}`,
        method: "GET",
      }),
    }),
    downloadInvoice: builder.mutation({
      query: ({invoiceId}) => ({
        url: `/invoice/download/${invoiceId}`,
        method: "GET",
        responseHandler: (response: any) => {
          return response.blob();
        },
      }),
    }),
  }),
});

export const { useCreateInvoiceMutation, useGetAllInvoicesQuery, useGanaratePaymentLinkMutation, useGetCurrencyQuery, useExistingCustomerQuery, useDownloadInvoiceMutation } = invoiceSlice;

export default invoiceSlice;
