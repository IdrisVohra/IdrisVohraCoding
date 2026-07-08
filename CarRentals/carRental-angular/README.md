# Hamdan Car Rental — Angular Edition

A full rewrite of the original React car-rental app as a modern **Angular 22** application
(standalone components, signals, zoneless change detection, lazy-loaded routes, Reactive Forms,
functional HTTP interceptors) backed by a hardened **Express + SQL Server** API.

## Project structure

```
carRental-angular/
├── client/     Angular 22 frontend (standalone components, zoneless)
└── server/     Express + Sequelize API (SQL Server)
```

## What changed vs. the original React app

- **Framework rewrite**: React (CRA) → Angular 22 with standalone components, signals,
  zoneless change detection, the new `@if`/`@for` control-flow syntax, and lazy-loaded routes.
- **Architecture**: `core/` (models, services, interceptors, static data), `shared/`
  (reusable components, directives, pipes, validators), `features/` (home, booking, fleet,
  trips, about, contact) — a conventional, scalable Angular layout.
- **Reactive Forms** replace the original's manual `useState`-per-field pattern, with real
  validators (required, email, phone pattern, min age, date-range, positive numbers) and
  inline error messages.
- **New pages**: a dedicated Fleet page (search/filter/sort), About, Contact, and a 404 page —
  filling out marketing sections whose image assets existed in the original repo but were
  never wired into a page.
- **UX polish**: sticky/blurred navbar, mobile drawer nav, toast notifications, a global
  loading bar tied to HTTP activity, confirm-before-delete dialog, skeleton loading states,
  scroll-reveal animations, animated stat counters, fully responsive layout (mobile → desktop).
- **Security fixes on the backend**:
  - The original server built SQL with raw string interpolation
    (`` `INSERT INTO rentals VALUES ('${...}')` ``), which is a SQL-injection vulnerability.
    It's replaced with parameterized Sequelize ORM calls (`Rental.create`, `Rental.update`).
  - Database credentials were hardcoded in `DatabaseConnection.js`. They now come from a
    `.env` file (see `server/.env.example`), which is git-ignored.
  - Added request validation, `helmet` security headers, scoped CORS (instead of allow-all),
    and centralized error handling.

## Getting started

### 1. Backend (`server/`)

```bash
cd server
cp .env.example .env   # fill in your SQL Server credentials
npm install
npm run dev             # nodemon, or `npm start` for a plain run
```

The API listens on `http://localhost:5000` by default and exposes:

- `GET /api/rentals` — list active rentals
- `POST /api/rentals` — create a rental (validated)
- `DELETE /api/rentals/:id` — soft-delete a rental
- `GET /api/health` — health check

### 2. Frontend (`client/`)

```bash
cd client
npm install
npm start   # ng serve, http://localhost:4200
```

For a production build:

```bash
npm run build   # outputs to client/dist/client
```

## Notes

- The frontend expects the API at `http://localhost:5000/api` in development
  (`client/src/environments/environment.development.ts`) and `/api` in production
  (`client/src/environments/environment.ts` — point this at your deployed API or serve
  both behind the same reverse proxy).
- The fleet/pricing data is static (`client/src/app/core/data/car-data.ts`), matching the
  original app's approach — only bookings and trips are persisted through the API.
