import { Chip, Paper, Stack, Typography } from "@mui/material";

interface JokeCardProps {
  joke?: string;
  category?: string[];
  dataSource?: string;
  isLoading?: boolean;
}

const texts = {
  random: "Random joke from all jokes:",
  categories: "Random joke based on selected category:",
  search: "Random joke based on search:",
};

const JokeCard = ({ joke, category, dataSource, isLoading }: JokeCardProps) => {
  const title = texts[dataSource as keyof typeof texts] || "Unknown joke source";

  if (isLoading) {
    return (
      <Paper
        elevation={10}
        sx={{
          marginTop: 4,
          padding: 2,
          width: "100%",
          textAlign: "center",
          mb: 5,
          textWrap: "pretty",
        }}
      >
        <Typography variant="h2" sx={{ mb: 3 }}>
          Loading...
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Chuck Norris doesn't wait for API. API waits for Chuck Norris.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={10}
      sx={{
        marginTop: 4,
        padding: 2,
        width: "100%",
        textAlign: "center",
        mb: 5,
        textWrap: "pretty",
      }}
    >
      <Typography variant="h2" sx={{ mb: 3 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        "{joke}"
      </Typography>
      {category && category.length > 0 && (
        <>
          <Stack direction="row" spacing={1} justifyContent="end" flexWrap="wrap" width={"100%"}>
            {category.map((cat) => (
              <Chip key={cat} label={cat} color="primary" variant="outlined" />
            ))}
          </Stack>
        </>
      )}
    </Paper>
  );
};

export default JokeCard;
