import { http, HttpResponse } from "msw";
import apiRoutes from "src/constants/apiRoutes";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const mockRandomJoke = {
  categories: [],
  created_at: "2020-01-01 00:00:00",
  icon_url: "https://example.com/icon.png",
  id: "abc123",
  updated_at: "2020-01-01 00:00:00",
  url: "https://example.com/joke/abc123",
  value: "Funny random joke",
};

const mockJokeCategory = (category: string) => {
  return {
    categories: [category],
    created_at: "2020-01-01 00:00:00",
    icon_url: "https://example.com/icon.png",
    id: "abc123",
    updated_at: "2020-01-01 00:00:00",
    url: "https://example.com/joke/abc123",
    value: `Funny joke about ${category}`,
  };
};

const mockJokeSearch = (search: string) => {
  const result = [
    {
      categories: [],
      created_at: "2020-01-01 00:00:00",
      icon_url: "https://example.com/icon.png",
      id: "abc123",
      updated_at: "2020-01-01 00:00:00",
      url: "https://example.com/joke/abc123",
      value: `1st funny joke with ${search}`,
    },
    {
      categories: [],
      created_at: "2020-01-01 00:00:00",
      icon_url: "https://example.com/icon.png",
      id: "abc123",
      updated_at: "2020-01-01 00:00:00",
      url: "https://example.com/joke/abc123",
      value: `2nd funny joke with ${search}`,
    },
  ];

  const resp = {
    total: result.length,
    result,
  };
  return resp;
};

const categories = [
  "animal",
  "career",
  "celebrity",
  "dev",
  "explicit",
  "fashion",
  "food",
  "history",
  "money",
  "movie",
  "music",
  "political",
  "religion",
  "science",
  "sport",
  "travel",
];

export const handlers = [
  http.get(`${VITE_API_URL}${apiRoutes.random}`, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    if (category) {
      return HttpResponse.json(mockJokeCategory(category), { status: 200 });
    }
    return HttpResponse.json(mockRandomJoke, { status: 200 });
  }),
  http.get(`${VITE_API_URL}${apiRoutes.categories}`, () => {
    return HttpResponse.json(categories, { status: 200 });
  }),
  http.get(`${VITE_API_URL}${apiRoutes.search}`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    if (query) {
      return HttpResponse.json(mockJokeSearch(query), { status: 200 });
    }
  }),
];
