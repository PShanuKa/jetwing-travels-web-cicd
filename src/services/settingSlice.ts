import apiSlice from "./apiSlice";

const settingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getSetting: builder.query({
      query: () => {
        return {
          url: `settings`,
          method: "GET",
        };

      },
      providesTags: ["Setting"],
    }),

    
    updateSetting: builder.mutation({
      query: (data) => {
        return {
          url: `settings/add-new-rate`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Setting"],
    }),
  }),
});

export const { useGetSettingQuery, useUpdateSettingMutation } = settingSlice;

export default settingSlice;
