import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectCurrentUser = (state) => state.user.value;

export default userSlice.reducer;
