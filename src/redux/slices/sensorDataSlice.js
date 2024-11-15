import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  token: "",
  isLoading: false,
};

const sensorDataSlice = createSlice({
  name: "sensorData",
  initialState,
  reducers: {
  },
});

export default sensorDataSlice.reducer;
