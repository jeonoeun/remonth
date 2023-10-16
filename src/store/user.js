// user 정보 담는 곳 (user 아이디 별 좋아요, 현재 로그인 된 유저)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [
    {
      name: "이재현",
      id: "1234",
      image:
        "https://i.pinimg.com/564x/b1/3f/ed/b13fedffd73d512f9e11eb0b98fc52d4.jpg",
    },
    {
      name: "이주연",
      id: "0215",
      image:
        "https://i.pinimg.com/564x/c2/e3/98/c2e39863091b34b4b253e903115e5550.jpg",
    },
  ],
  currentUser: {
    name: "",
    id: "",
    image: "",
    email: "",
    cards: [],
    remonths: [],
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
