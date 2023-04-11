import { Box, Button } from "@mui/material";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthState();
    const getName = async () => {
      const { attributes } = await Auth.currentAuthenticatedUser();
      setName(attributes.name);
    };
    getName();
  }, []);

  async function signOut() {
    try {
      await Auth.signOut();
      navigate("/sign-in");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
    } catch (error) {
      navigate("/sign-in");
    }
  }

  return (
    <Box>
      {name}
      <Button variant="text" color="primary" onClick={() => signOut()}>
        sign out
      </Button>
    </Box>
  );
};

export default Header;
