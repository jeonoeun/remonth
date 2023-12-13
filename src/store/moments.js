import { createSlice } from "@reduxjs/toolkit";

const momentsSlice = createSlice({
  name: "moments",
  initialState: {
    allMoments: [],
    userMoments: [],
  },
  reducers: {
    setAllMoments: (state, action) => {
      state.allMoments = action.payload;
    },
    setUserMoments: (state, action) => {
      state.userMoments = action.payload;
    },
  },
});

export const { setAllMoments, setUserMoments } = momentsSlice.actions;

export const selectAllMoments = (state) => state.moments.allMoments;
export const selectUserMoments = (state) => state.moments.userMoments;

export default momentsSlice.reducer;
