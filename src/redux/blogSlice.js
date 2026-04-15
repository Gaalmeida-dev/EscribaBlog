import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    userBlogs: [],
  },
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setUserBlogs: (state, action) => {
      state.userBlogs = action.payload;
    },
  },
});

export const { setBlogs, setUserBlogs } = blogSlice.actions;
export default blogSlice.reducer;
