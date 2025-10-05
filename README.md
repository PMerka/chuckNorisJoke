# Chuck Norris Joke app

## Start

```
npm run dev
```

## Tech Stack Overview

**Frontend Framework**

- React 19

**Styling & UI Components**

- MUI v7
- @emotion/react & @emotion/styled (CSS-in-JS)

**State Management & Data Fetching**

- TanStack React Query v5 – server state: fetching, caching, synchronization
- useReducer (React) – UI/client state (selected category, search string, data source)

**HTTP Client**

- Axios

**Tooling & Build**

- Vite
- TypeScript
- ESLint & Prettier

**Testing & Mocking**

- Vitest
- @testing-library/react & @testing-library/jest-dom
- MSW (Mock Service Worker) – API request mocking for tests

## Main Idea:

The application separates **server state** and **client/UI state**:

- **Server state** – data returned from the API, managed by TanStack Query
- **Client state** – user preferences and settings, managed with `useReducer`
- **Derived state** – combination of both for displaying only one joke based on settings

Slight advantage compared to pure client state solution is caching.
If you call random joke based on search twice there with same text,
it will call API only once (it fetches all jokes and then select with math.random())
