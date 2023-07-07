import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("authUser")) || {
      name: "",
      password: "",
      image: "",
      authUser: false,
    },
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      if (!action.payload) {
        state.user.authUser = false;
      } else {
        state.user.authUser = true;
        const saveState = JSON.stringify(action.payload);
        sessionStorage.setItem("authUser", saveState);
      }
    },
    logout(state) {
      state.user = {
        name: "",
        password: "",
        image: "",
        authUser: false,
      };
      sessionStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
