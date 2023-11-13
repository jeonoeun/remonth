// user 정보 담는 곳 (user 아이디 별 좋아요, 현재 로그인 된 유저)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
  currentUser: {
    name: "",
    id: "",
    image: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const found = state.userData.find((e) => e.id === action.payload.id);
      if (!found) {
        state.userData.push(action.payload);
      }
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setUserCards: (state, action) => {
      state.currentUser.cards = action.payload;
    },
    setUserRemonths: (state, action) => {
      state.currentUser.remonths = action.payload;
    },
  },
});

export const { addUser, setCurrentUser, setUserCards, setUserRemonths } =
  userSlice.actions;
export default userSlice.reducer;
