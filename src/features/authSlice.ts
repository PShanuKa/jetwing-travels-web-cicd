import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}") : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,

};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});



export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

