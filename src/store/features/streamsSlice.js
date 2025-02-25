import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
};

export const streamsSlice = createSlice({
  name: "streams",
  initialState,
  reducers: {
    updateStreams: (state, action) => {
      state.data = action.payload;
    },

    deleteStreamFromStore: (state, action) => {
      const id = action.payload;
      if (!id) return;
      const filtered = state.data.filter((stream) => stream._id !== id);
      state.data = filtered;
    },
  },
});

export const { updateStreams, deleteStreamFromStore } = streamsSlice.actions;

export default streamsSlice.reducer;
