import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  companySelectedOpen: true,
  companySelected: localStorage.getItem("companySelected") ? JSON.parse(localStorage.getItem("companySelected") || "") : "",
  pageHeader: "Dashboard",
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
    setCompanySelected: (state, action) => {
      state.companySelected = action.payload;
      localStorage.setItem("companySelected", JSON.stringify(action.payload));
    },
    clearCompanySelected: (state) => {
      state.companySelected = "";
      localStorage.removeItem("companySelected");
    },
    setPageHeader: (state, action) => {
      state.pageHeader = action.payload;
    },
  },
});

export const { setIsSidebarOpen, setCompanySelectedOpen, setCompanySelected , clearCompanySelected, setPageHeader} = metaSlice.actions;
export default metaSlice.reducer;
