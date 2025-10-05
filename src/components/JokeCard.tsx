import { Chip, LinearProgress, Paper, Stack, Typography } from "@mui/material";

interface JokeCardProps {
  joke?: string;
  category?: string[];
  dataSource?: string;
  isLoading?: boolean;
  error?: Error | null;
}

const texts = {
  random: "Random joke from all jokes:",
  categories: "Random joke based on selected category:",
  search: "Random joke based on search:",
};

const JokeCard = ({ joke, category, dataSource, isLoading, error }: JokeCardProps) => {
  const title = texts[dataSource as keyof typeof texts] || "Unknown joke source";

  const cardStyle = {
    marginTop: 4,
    padding: 2,
    width: "100%",
    textAlign: "center",
    mb: 5,
    textWrap: "pretty",
    minHeight: 200,
  };

  if (error) {
    return (
      <Paper elevation={10} sx={cardStyle} role="alert">
        <Typography variant="h2" sx={{ mb: 1 }}>
          Error
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }} color="error">
          {`Sorry, server was too afraid of Chuck Norris. Failed to load joke.`}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }} color="error">
          {error.message
            ? `Error detail: ${error.message}`
            : "No additional error details available."}
        </Typography>
      </Paper>
    );
  }

  if (isLoading) {
    return (
      <Paper elevation={10} sx={cardStyle} role="status">
        <Typography variant="h2" sx={{ mb: 1 }}>
          Loading...
        </Typography>
        <LinearProgress sx={{ width: "100%", mb: 2 }} />
        <Typography variant="body1" sx={{ mb: 2 }}>
          Chuck Norris doesn't wait for API. API waits for Chuck Norris.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={10}
      sx={cardStyle}
      data-testid="joke-card"
      role="region"
      aria-label="Joke card"
    >
      <Typography variant="h2" sx={{ mb: 3 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        "{joke}"
      </Typography>
      {category && category.length > 0 && (
        <Stack direction="row" spacing={1} justifyContent="end" flexWrap="wrap" width={"100%"}>
          {category.map((cat) => (
            <Chip key={cat} label={cat} color="primary" variant="outlined" />
          ))}
        </Stack>
      )}
    </Paper>
  );
};

export default JokeCard;
