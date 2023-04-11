import { createSlice } from "@reduxjs/toolkit";
import {
  createTodoThunk,
  deleteTodoThunk,
  fetchTodosThunk,
  updateTodoThunk,
} from "./todoThunk";
import { Todo } from "../../API";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [] as Todo[],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodosThunk.fulfilled, (state, action) => {
      console.log("fetchTodosThunk.fulfilled");
      state.todos = action.payload.data?.listTodos?.items as Todo[];
    });
    builder.addCase(createTodoThunk.fulfilled, (state, action) => {
      console.log("createTodoThunk.fulfilled");
      state.todos.push(action.payload.data?.createTodo as Todo);
    });
    builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
      console.log("deleteTodoThunk.fulfilled");
      const idx = state.todos.findIndex(
        (el) => action.payload.data?.deleteTodo?.id === el.id
      );
      if (idx > -1) state.todos.splice(idx, 1);
    });
    builder.addCase(updateTodoThunk.fulfilled, (state, action) => {
      console.log("updateTodoThunk.fulfilled");
      const idx = state.todos.findIndex(
        (el) => action.payload.data?.updateTodo?.id === el.id
      );
      if (idx > -1)
        state.todos.splice(idx, 1, action.payload.data?.updateTodo as Todo);
    });
  },
});

export default todosSlice.reducer;
