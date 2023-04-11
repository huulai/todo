import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { createTodoThunk } from "../store/todo/todoThunk";

const TodoCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateTodo = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(createTodoThunk({ name, description }));
  };
  return (
    <Box component="form" onSubmit={handleCreateTodo}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="none"
        required
        fullWidth
        name="description"
        label="Description"
        type="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="success"
        sx={{ float: "right", mt: 2, mr: 2 }}
      >
        Create
      </Button>
    </Box>
  );
};

export default TodoCreate;
