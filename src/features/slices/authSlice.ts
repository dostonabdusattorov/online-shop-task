import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: { name: string; password: string; image: string; authUser: boolean };
}

const initialState: AuthState = {
  user: JSON.parse(sessionStorage.getItem("authUser") as string) || {
    name: "",
    password: "",
    image: "",
    authUser: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
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
