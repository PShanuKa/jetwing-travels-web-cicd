import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  companySelectedOpen: true,
};

export const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setIsSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    setCompanySelectedOpen: (state, action) => {
      state.companySelectedOpen = action.payload;
    },
  },
});

export const { setIsSidebarOpen, setCompanySelectedOpen } = metaSlice.actions;
export default metaSlice.reducer;
