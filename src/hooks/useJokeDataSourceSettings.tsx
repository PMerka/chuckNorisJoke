import { useReducer } from "react";

type JokeSourceState = {
  dataSource: "random" | "search" | "categories";
  category: string | null;
  searchString: string;
};

type Action =
  | { type: "SET_RANDOM" }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_SEARCH"; payload: string };

const initialState: JokeSourceState = {
  dataSource: "random",
  category: null,
  searchString: "",
};

function reducer(state: JokeSourceState, action: Action): JokeSourceState {
  switch (action.type) {
    case "SET_RANDOM":
      return { ...state, dataSource: "random" };
    case "SET_CATEGORY":
      return { ...state, dataSource: "categories", category: action.payload };
    case "SET_SEARCH":
      return { ...state, dataSource: "search", searchString: action.payload };
    default:
      return state;
  }
}

/**
 * Hook for managing search options of random jokes.
 * Sets active source of joke and params like search string or category.
 */
export const useJokeDataSourceSettings = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch] as const;
};
