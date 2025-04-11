import apiSlice from "./apiSlice";

const paymentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
          url: `invoice/payment/initiate?gateway=${gateway}`,
          method: "POST",
          body: rest,
        };
      },
    }),
  }),
});

export const { useGetPaymentDetailsQuery, useInitiatePaymentMutation } = paymentSlice;

export default paymentSlice;
