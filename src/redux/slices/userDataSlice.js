import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  token: "",
  role: "",
  isLoading: false,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    logout: () => initialState,
  },
});

export const { setUserName, setToken, setRole, logout } = userDataSlice.actions;

export default userDataSlice.reducer;
