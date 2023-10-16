// firebase에서 받아서 뿌릴 카드리스트 담는 곳

import { createSlice } from "@reduxjs/toolkit";

const momentSlice = createSlice({
  name: "moments",
  initialState: {
    moments: [],
    remonths: [],
  },
  reducers: {
    setMoments: (state, action) => {
      state.moments = action.payload;
    },
    setRemonths: (state, action) => {
      state.remonths = action.payload;
    },
  },
});

export const { setMoments, setRemonths } = momentSlice.actions;
export default momentSlice.reducer;
