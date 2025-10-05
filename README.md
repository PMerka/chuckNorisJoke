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
- **Derived state** – combination of both, computed in components and passed down as props (not saved in reactive state)

For the UI - derived state (combine server state and client state) is calculated and passed to components.

Using just server state eg. just useReducer or state management library, would be also ok.

Slight advantage is caching => so if you call random joke based on search twice there will not only one API call (API returns all jokes and random joke is selected on FE).
