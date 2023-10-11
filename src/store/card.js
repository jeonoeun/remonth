//firebase에 보낼 카드 설정 담는 곳

import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    card: { date: "2023-10-01" },
  },
  reducers: {
    setCardDetail: (state, action) => {
      state.card = action.payload;
    },
  },
});

export const { setCardDetail } = cardSlice.actions;
export default cardSlice.reducer;
