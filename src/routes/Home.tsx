import { Box, Container, Divider, Typography } from "@mui/material";
import { Todo } from "../API";
import { useEffect } from "react";
import TodoItem from "../components/TodoItem";
import TodoCreate from "../components/TodoCreate";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchTodosThunk } from "../store/todo/todoThunk";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../components/Header";

const Home = () => {
  const todosSlice = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, []);

  return (
    <Container maxWidth="sm">
      <Header />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TodoCreate />
        <Typography component="h1" variant="h5">
          List To Do
        </Typography>
        <Grid
          container
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginTop: "5px",
          }}
          spacing={2}
        >
          <Grid xs={3}>
            <b>ID</b>
          </Grid>
          <Grid xs={3}>
            <b>Name</b>
          </Grid>
          <Grid xs={4}>
            <b>Description</b>
          </Grid>
          <Grid xs={2} sx={{ textAlign: "center" }}>
            <b>Action</b>
          </Grid>
        </Grid>
        <Divider sx={{ width: "100%", margin: "2px" }} />
        {todosSlice.map((todo: Todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </Box>
    </Container>
  );
};

export default Home;
