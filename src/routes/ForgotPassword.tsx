import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [isSubmitedUsername, setIsSubmitedUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await Auth.forgotPassword(username);
      setError("");
      setIsSubmitedUsername(true);
    } catch (error) {
      // @ts-ignore
      setError(JSON.stringify(error.message));
      console.log("error signing in", error);
    }
  };
  const handleChangePassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      await Auth.forgotPasswordSubmit(username, code, newPassword);
      setError("");
      navigate("/sign-in");
    } catch (error) {
      // @ts-ignore
      setError(JSON.stringify(error.message));
      console.log("error signing in", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Typography component="h1" variant="h5">
        Forgot Password
      </Typography>
      {!isSubmitedUsername ? (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          {!!error && (
            <Typography variant="body1" color="red">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            submit
          </Button>
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={handleChangePassword}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="code"
            label="code"
            name="code"
            autoComplete="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="new password"
            name="password"
            autoComplete="password"
            type="password"
            value={newPassword}
            onChange={(e) => setnewPassword(e.target.value)}
            autoFocus
          />
          {!!error && (
            <Typography variant="body1" color="red">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            submit
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ForgotPassword;
