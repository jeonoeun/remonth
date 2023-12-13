import { createSlice } from "@reduxjs/toolkit";

const remonthsSlice = createSlice({
  name: "remonths",
  initialState: {
    allRemonths: [],
    userRemonths: [],
  },
  reducers: {
    setAllRemonths: (state, action) => {
      state.allRemonths = action.payload;
    },
    setUserRemonths: (state, action) => {
      state.userRemonths = action.payload;
    },
  },
});

export const { setAllRemonths, setUserRemonths } = remonthsSlice.actions;

export const selectAllRemonths = (state) => state.remonths.allRemonths;
export const selectUserRemonths = (state) => state.remonths.userRemonths;

export default remonthsSlice.reducer;
