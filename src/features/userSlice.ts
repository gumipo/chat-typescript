import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export const userSlice = createSlice({
  //action
  name: "user",
  initialState: {
    user: {
      uid: "",
      photoUrl: "",
      displayName: "",
    },
  },

  //reducer
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { uid: "", photoUrl: "", displayName: "" };
    },
  },
});

export const { login, logout } = userSlice.actions;

//selector
export const selectUser = (state: RootState) => state.users.user;

export default userSlice.reducer;
