import { GraphQLQuery, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import {
  CreateTodoInput,
  CreateTodoMutation,
  DeleteTodoInput,
  DeleteTodoMutation,
  ListTodosQuery,
  UpdateTodoInput,
  UpdateTodoMutation,
} from "../../API";
import { listTodos } from "../../graphql/queries";
import { createTodo, deleteTodo, updateTodo } from "../../graphql/mutations";

export const fetchTodosThunk = createAsyncThunk("fetchThunk", () => {
  console.log("fetchThunk");
  return API.graphql<GraphQLQuery<ListTodosQuery>>(graphqlOperation(listTodos));
});

export const createTodoThunk = createAsyncThunk(
  "createTodoThunk",
  (payload: CreateTodoInput) => {
    console.log("createTodoThunk");
    return API.graphql<GraphQLQuery<CreateTodoMutation>>({
      query: createTodo,
      variables: { input: payload },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });
  }
);

export const deleteTodoThunk = createAsyncThunk(
  "deleteTodoThunk",
  (payload: DeleteTodoInput) => {
    console.log("deleteTodoThunk");
    return API.graphql<GraphQLQuery<DeleteTodoMutation>>({
      query: deleteTodo,
      variables: { input: payload },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });
  }
);

export const updateTodoThunk = createAsyncThunk(
  "createAsyncThunk",
  (payload: UpdateTodoInput) => {
    console.log("updateTodoThunk");
    return API.graphql<GraphQLQuery<UpdateTodoMutation>>({
      query: updateTodo,
      variables: { input: payload },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });
  }
);
