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
      query: ({ name, query, 
        
        // filters
      
      }) => {
        const queryString = new URLSearchParams(query);
        return {
          url: `report/${name}?${queryString.toString()}`,
          method: "POST",
          // body: {"filters": filters},
          body: {
            "filters": [
              {
                "filterName": "string",
                "filterParameter": "string",
                "dataType": "string",
                "options": [
                  {
                    "code": "string",
                    "name": "string",
                    "valid": true
                  }
                ],
                "value": "string"
              }
            ]
          },
        };
      },
    }),
    downloadReport: builder.mutation({
      query: ({ name,
        //  filters


       } ) => {
        return {
          url: `report/${name}/download`,
          method: "POST",
          // body: {"filters": filters},
          responseHandler: (response: any) => response.blob(),
        };
      },
    }),
  }),
});

export const { useGetFiltersSchemaQuery, useGetReportDataQuery, useDownloadReportMutation } = reportSlice;

export default reportSlice;


