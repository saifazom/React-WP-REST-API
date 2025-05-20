import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpService } from "../httpService";
import type { WpPost } from "~/redux/features/wpSlice";

export const wpService = {
  getPosts: () => httpService.get<WpPost[]>("/posts"),
  getPostById: (id: number) => httpService.get<WpPost>(`/posts/${id}`),
  createPost: (post: Omit<WpPost, "id">) =>
    httpService.post<WpPost>("/posts", post),
  updatePost: (id: number, post: Partial<WpPost>) =>
    httpService.put<WpPost>(`/posts/${id}`, post),
  deletePost: (id: number) => httpService.delete(`/posts/${id}`),
};

export const fetchWpPage = createAsyncThunk(
  "wp/fetchPage",
  async (slug: string, { rejectWithValue }) => {
    try {
      const res = await httpService.get<any[]>(`/pages?slug=${slug}`);
      if (!res || res.length === 0) {
        return rejectWithValue("Page not found (404)");
      }
      return res[0];
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch page");
    }
  }
);

export const fetchWpPosts = createAsyncThunk(
  "wp/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await wpService.getPosts();
      if (!res || res.length === 0) {
        return rejectWithValue("No posts found (404)");
      }
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch posts");
    }
  }
);

export const fetchWpMenu = createAsyncThunk(
  "wp/fetchMenu",
  async (_, { rejectWithValue }) => {
    try {
      const res = await httpService.get<any[]>("/pages");
      if (!res || res.length === 0) {
        return rejectWithValue("No menu/pages found (404)");
      }

      return res.map((page) => ({
        label: page.title.rendered,
        slug: page.slug,
      }));
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch menu");
    }
  }
);

export const fetchWpFooter = createAsyncThunk(
  "wp/fetchFooter",
  async (_, { rejectWithValue }) => {
    try {
      // এখারে আপনার WordPress REST API endpoint দিন, যেমন: /footer বা কাস্টম এন্ডপয়েন্ট
      const res = await httpService.get<any[]>("/footer");
      if (!res || res.length === 0) {
        return rejectWithValue("Footer not found (404)");
      }
      return res[0];
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch footer");
    }
  }
);
