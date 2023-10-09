import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    card: { date: "2023-10-02" },
  },
  reducers: {
    setCard: (state, action) => {
      state.card = action.payload;
    },
  },
});

export const { setCard } = cardSlice.actions;
export default cardSlice.reducer;
