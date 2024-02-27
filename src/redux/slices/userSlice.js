import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("user") === null ? false : true,
  userName:
    localStorage.getItem("userName") === null
      ? ""
      : localStorage.getItem("userName"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.online;
      state.userName = action.payload.userName;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
