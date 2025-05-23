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
    initiatePaymentAmex: builder.mutation({
      query: (data) => {
        const {  ...rest } = data;
        return {
          url: `payments/initiate?gateway=amex`,
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
    notifyPayment: builder.mutation({
      query: (data) => {
        return {
          url: `payment/master-card/notify`,
          method: "POST",
          body: data,
        };
      },
    }),
    notifyPaymentAmex: builder.mutation({
      query: (data) => {
        const { clientRef, ...rest } = data;
        return {
          url: `payments/complete?clientRef=${clientRef}`,
          method: "POST",
          body: rest,
        };
      },
    }),
  }),
});

export const { useGetPaymentDetailsQuery, useInitiatePaymentMutation , useFetchCaptureContextMutation , useGetAllPaymentQuery , useInitiatePaymentAmexMutation , useNotifyPaymentMutation , useNotifyPaymentAmexMutation } = paymentSlice;

export default paymentSlice;
