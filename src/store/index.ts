import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todo/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  middleware: (getDefaulMiddleware) => {
    return getDefaulMiddleware({ serializableCheck: false });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
