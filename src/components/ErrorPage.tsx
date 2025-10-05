import { Container, Paper, Typography } from "@mui/material";

const ErrorPage = () => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        minHeight: "80dvh",
      }}
    >
      <Paper elevation={10} sx={{ marginTop: 4, padding: 2, width: "100%" }}>
        <Typography
          component="h1"
          variant="h1"
          sx={{ textAlign: "center", mb: 5, textWrap: "balance" }}
        >
          Sorry something went wrong...
        </Typography>
        <Typography sx={{ textAlign: "center", mb: 5, textWrap: "balance" }}>
          Unexpected error of the app. Try to refresh the page.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ErrorPage;
