import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "~/redux/features/userSlice";
import counterReducer from "~/redux/features/counterSlice";
import wpReducer from "~/redux/features/wpSlice";

const rootReducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
  wp: wpReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
