import { Divider, IconButton, TextField } from "@mui/material";
import { Todo } from "../API";
import Grid from "@mui/material/Unstable_Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { deleteTodoThunk, updateTodoThunk } from "../store/todo/todoThunk";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [name, setName] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);
  const [isEditting, setIsEditting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleCancelEditting = () => {
    setName(todo.name);
    setDescription(todo.description);
    setIsEditting(false);
  };

  const handleConfirmEditting = () => {
    dispatch(
      updateTodoThunk({
        id: todo.id,
        name,
        description,
      })
    );
    setIsEditting(false);
  };

  return (
    <>
      <Grid
        container
        sx={{ width: "100%", display: "flex", alignItems: "center" }}
        spacing={2}
      >
        <Grid xs={3}>
          <span>{todo.id?.split("-")[0]}</span>
        </Grid>
        {!isEditting ? (
          <>
            <Grid xs={3}>
              <b>{todo.name}</b>
            </Grid>
            <Grid xs={4}>
              <b>{todo.description}</b>
            </Grid>
            <Grid xs={2} sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                aria-label=""
                onClick={() => dispatch(deleteTodoThunk({ id: todo.id }))}
              >
                <DeleteIcon
                  color="error"
                  sx={{ cursor: "pointer", verticalAlign: "center" }}
                />
              </IconButton>
              <IconButton onClick={() => setIsEditting(!isEditting)}>
                <EditIcon
                  color="warning"
                  sx={{ cursor: "pointer", verticalAlign: "center" }}
                ></EditIcon>
              </IconButton>
            </Grid>
          </>
        ) : (
          <>
            <Grid xs={3}>
              <TextField
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid xs={4}>
              <TextField
                size="small"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid xs={2} sx={{ display: "flex", alignItems: "center" }}>
              <IconButton aria-label="" onClick={() => handleCancelEditting()}>
                <ClearIcon
                  color="error"
                  sx={{ cursor: "pointer", verticalAlign: "center" }}
                />
              </IconButton>
              <IconButton onClick={() => handleConfirmEditting()}>
                <CheckIcon
                  color="success"
                  sx={{ cursor: "pointer", verticalAlign: "center" }}
                />
              </IconButton>
            </Grid>
          </>
        )}
      </Grid>
      <Divider sx={{ width: "100%", margin: "2px" }} />
    </>
  );
};

export default TodoItem;
