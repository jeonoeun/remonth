import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    name: "",
    id: "",
    image: "",
    email: "",
  },
  userList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addNewUser: (state, action) => {
      const found =
        state.userList &&
        state.userList.length !== 0 &&
        state.userList.find((e) => e.id === action.payload.id);
      if (!found) {
        state.userList && state.userList.push(action.payload);
      }
    },
  },
});

export const { setCurrentUser, addNewUser } = userSlice.actions;
export default userSlice.reducer;
