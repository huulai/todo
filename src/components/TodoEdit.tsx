import { Box, Button, TextField, Typography } from "@mui/material";

const TodoEdit = () => {
  return (
    <Box component="form">
      <Typography variant="body1" color="initial">
        ID: {1}
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
      />
      <TextField
        margin="none"
        required
        fullWidth
        name="description"
        label="Description"
        type="description"
        id="description"
      />
      <Button
        type="submit"
        variant="contained"
        color="warning"
        sx={{ float: "right", mt: 2, mr: 2 }}
      >
        Edit
      </Button>
    </Box>
  );
};

export default TodoEdit;
