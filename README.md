# HotsData Frontend

Modern React frontend for HotsData replay analytics.

## Requirements

- Node.js 22.12 or newer
- npm 10 or newer

## Setup

    npm install
    cp .env.example .env
    npm run dev

The Vite dev server prints the local URL, normally `http://127.0.0.1:5173`.

## Environment

    VITE_API_HOST=http://localhost:8080
    VITE_USE_FIXTURES=false
    VITE_GA_MEASUREMENT_ID=

When `VITE_USE_FIXTURES=true`, the frontend uses committed fixture data. When it is `false`, API calls target `VITE_API_HOST` and fall back to fixtures if the API is offline.

## Commands

    npm run dev
    npm run build
    npm run preview
    npm test
    npm run lint
    npm run typecheck

## Notes

The current app preserves hash routes such as `#/replays` to avoid requiring server routing changes during the first modernization pass. See `FRONTEND_MODERNIZATION_EXEC_PLAN.md` for the living migration plan and validation notes.
