import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWpPage,
  fetchWpPosts,
  fetchWpMenu,
} from "~/services/httpServices/wpService";

export interface WpRendered {
  rendered: string;
}
export interface WpPage {
  id: number;
  title: WpRendered;
  content: WpRendered;
}
export interface WpPost {
  id: number;
  title: WpRendered;
  excerpt: WpRendered;
}

export interface WpState {
  page: WpPage | null;
  posts: WpPost[];
  menu: any[];
  loading: boolean;
  error: string | null;
}

const initialState: WpState = {
  page: null,
  posts: [],
  menu: [],
  loading: false,
  error: null,
};

const wpSlice = createSlice({
  name: "wp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWpPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWpPage.fulfilled, (state, action) => {
        state.loading = false;
        state.page = action.payload;
      })
      .addCase(fetchWpPage.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || null;
      })
      .addCase(fetchWpPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchWpMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWpMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload;
      })
      .addCase(fetchWpMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default wpSlice.reducer;
