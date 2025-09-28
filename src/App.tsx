import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import JokeCard from "./components/JokeCard";
import SearchControls from "./components/SearchControls";

function App() {
  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80dvh",
        }}
      >
        <SearchControls />

        <JokeCard joke="Chuck Norris can divide by zero." category={["dev"]} />
      </Container>
    </>
  );
}

export default App;
