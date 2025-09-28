export interface JokeItem {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}

export interface SearchJokesResponse {
  total: number;
  result: JokeItem[];
}
