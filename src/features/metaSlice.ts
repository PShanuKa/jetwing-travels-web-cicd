import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  companySelectedOpen: true,
  companySelected: localStorage.getItem("companySelected") || "",
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
      localStorage.setItem("companySelected", action.payload);
    },
    clearCompanySelected: (state) => {
      state.companySelected = "";
      localStorage.removeItem("companySelected");
    },
  },
});

export const { setIsSidebarOpen, setCompanySelectedOpen, setCompanySelected , clearCompanySelected} = metaSlice.actions;
export default metaSlice.reducer;
