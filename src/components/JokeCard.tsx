import { Chip, Paper, Stack, Typography } from "@mui/material";

interface JokeCardProps {
  joke: string;
  category?: string[];
  condition?: string;
}

const JokeCard = ({ joke, category, condition }: JokeCardProps) => {
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
        Random joke based on search:
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
