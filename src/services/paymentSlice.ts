import apiSlice from "./apiSlice";

const paymentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayment: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return {
          url: `payment/payment-filter?${queryParams}`,
          method: "GET",
        };
      },
    }),
    getPaymentDetails: builder.query({
      query: (data) => {
        const { invoiceId, token } = data;
        return {
          url: `invoice/payment-link/${invoiceId}/${token}`,
          method: "GET",
        };
      },
    }),

    initiatePayment: builder.mutation({
      query: (data) => {
        const { gateway , ...rest } = data;
        return {
          url: `payment/initiate?gateway=${gateway}`,
          method: "POST",
          body: rest,
        };
      },
    }),
    fetchCaptureContext: builder.mutation({
      query: (data) => {
        return {
          url: `payment/capture-context`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetPaymentDetailsQuery, useInitiatePaymentMutation , useFetchCaptureContextMutation , useGetAllPaymentQuery } = paymentSlice;

export default paymentSlice;
