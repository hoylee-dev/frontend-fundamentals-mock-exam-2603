# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Meeting room reservation system (회의실 예약 시스템) — a Toss frontend developer interview assignment. Korean-language UI throughout. The project uses MSW (Mock Service Worker) for all API mocking; there is no real backend.

## Commands

```bash
yarn start            # Dev server on port 3000
yarn build            # TypeScript check + Vite build
yarn test             # Run all tests (single run)
yarn test:watch       # Run tests in watch mode
yarn test src/App.easy  # Run only easy test suite
yarn test src/App.hard  # Run only hard test suite
```

## Architecture

**Stack:** React 17, TypeScript 5.3, Vite 5, Emotion (CSS-in-JS) + SASS, React Query v4, React Hook Form, Axios, Vitest

**Path aliases** (configured in both `tsconfig.json` and `vite.config.ts`, baseUrl is `src`):
- `_tosslib/*`, `pages/*`, `components/*`, `hooks/*`, `utils/*`, etc.

### Key Directories

- `src/pages/` — Page components and routing
  - `Routes.tsx` — React Router v6: `/` → ReservationStatusPage, `/booking` → RoomBookingPage
  - `remotes.ts` — API client functions (getRooms, getReservations, createReservation, getMyReservations, cancelReservation)
  - `http.ts` — Axios wrapper
- `src/_tosslib/` — Internal UI component library (do not modify unless necessary)
  - `components/` — Reusable UI components (Button, Text, Slider, Radio, Select, etc.)
  - `server/` — MSW mock server setup, handlers, and mock data
  - `sass/` — SCSS styling system for components
- `src/App.easy.spec.tsx` — Basic feature tests
- `src/App.hard.spec.tsx` — Advanced feature tests

### Data Flow

1. `App.tsx` sets up QueryClientProvider (retry: false, refetchOnWindowFocus: false) + GlobalPortal + PageLayout
2. Pages call API functions from `pages/remotes.ts` → `pages/http.ts` (Axios wrapper)
3. MSW intercepts all HTTP requests in both browser (`_tosslib/server/browser.ts`) and test (`_tosslib/server/node.ts`) environments
4. Mock data lives in `_tosslib/server/data/rooms.ts`

### Mock API Endpoints

- `GET /api/rooms` — List meeting rooms
- `GET /api/reservations?date=YYYY-MM-DD` — Reservations for a date
- `POST /api/reservations` — Create reservation
- `GET /api/my-reservations` — User's reservations
- `DELETE /api/reservations/:id` — Cancel reservation

### Testing

- Vitest with jsdom environment, 10s timeout
- React Testing Library + user-event for interaction testing
- MSW server auto-starts in `vitest.setup.ts`; data resets between tests via `resetData()`
- Tests render `<App />` inside `<MemoryRouter>` — test the full app, not isolated components
- Test descriptions are in Korean matching the feature requirements

## Code Conventions

- Prettier: 120 char width, single quotes, trailing commas (es5), 2-space indent
- ESLint enforces: PascalCase for interfaces/types, camelCase/PascalCase for functions, strict `===` equality (null exempt), curly braces required, exhaustive-deps for hooks
- JSX uses Emotion's `jsxImportSource` (`@emotion/react`) — `css` prop available without import in JSX files
- Node.js version: 22.12.0 (see `.nvmrc`)
