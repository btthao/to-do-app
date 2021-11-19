import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import todoReducer from "../features/todoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
