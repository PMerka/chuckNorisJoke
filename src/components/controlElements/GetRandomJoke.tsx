import { Button, Typography } from "@mui/material";

interface GetRandomJokeProps {
  handleRefetchFullyRandomJoke: () => void;
  dataSource: string;
}

const GetRandomJoke = ({ handleRefetchFullyRandomJoke, dataSource }: GetRandomJokeProps) => {
  return (
    <>
      <Typography
        variant="h3"
        align="center"
        sx={dataSource === "random" ? { color: "primary.main", fontWeight: "bold" } : {}}
      >
        Get a Fully Random Joke
      </Typography>
      <Button variant="outlined" onClick={handleRefetchFullyRandomJoke}>
        Get Random Joke From All Jokes
      </Button>
    </>
  );
};

export default GetRandomJoke;
