import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    card: { date: "2023-11-01" },
  },
  reducers: {
    setCardDetail: (state, action) => {
      state.card = action.payload;
    },
  },
});

export const { setCardDetail } = cardSlice.actions;
export default cardSlice.reducer;
