import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: { data: [] }, // consistent shape
  reducers: {
    addFeed: (_, action) => {
      // your API probably returns { data: [...] } — be defensive
      return { data: action.payload.data ?? [] };
    },
    removeUserFromFeed: (state, action) => {
      return {
        ...state,
        data: state.data.filter((user) => user._id !== action.payload),
      };
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
