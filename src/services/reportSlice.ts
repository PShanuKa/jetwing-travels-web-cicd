import apiSlice from "./apiSlice";

const reportSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFiltersSchema: builder.query({
      query: (name) => ({
        url: `report/${name}/filters`,
        method: "GET",
      }),
    }),
    getReportData: builder.query({
      query: (data) => {
        const { name } = data;
        return {
          url: `report/${name}`,
          method: "POST",
          body: {
            // Remove the unused query property
            // query,
          },
        };
      },
    }),
    downloadReport: builder.mutation({
      query: ({
        name,

        // filters
      }) => {
        return {
          url: `report/${name}/download`,
          method: "POST",
          responseHandler: (response: any) => {
            return response.blob();
          },
          // body: {"filters": filters},
          body: {
            filters: [
              {
                filterName: "string",
                filterParameter: "string",
                dataType: "string",
                options: [
                  {
                    code: "string",
                    name: "string",
                    valid: true,
                  },
                ],
                value: "string",
              },
            ],
          },
        };
      },
    }),
  }),
});

export const {
  useGetFiltersSchemaQuery,
  useGetReportDataQuery,
  useDownloadReportMutation,
} = reportSlice;

export default reportSlice;
