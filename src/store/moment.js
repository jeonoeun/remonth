// firebase에서 받아서 뿌릴 카드리스트 담는 곳

import { createSlice } from "@reduxjs/toolkit";

const momentSlice = createSlice({
  name: "moments",
  initialState: {
    moments: [],
  },
  reducers: {
    setMoments: (state, action) => {
      state.moments = action.payload;
    },
  },
});

export const { setMoments } = momentSlice.actions;
export default momentSlice.reducer;
