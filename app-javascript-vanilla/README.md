# Corte Inglés — JavaScript test (Example)

This is a small JavaScript + TypeScript + Vite example project used for a coding exercise / component testing. It contains a simple Todo-like app.

Key project highlights

- Code: TypeScript + JavaScript (Vite)
- MVC pattern: Model, view, controller
- Tests: E2E test using Playwright

Prerequisites

- > Node.js 18+ (recommended)
- pnpm (preferred package manager for this repo)

Setup & install

1. Get to the directory

```powershell
cd app-javascript-vanilla
```

2. Install dependencies with pnpm

```powershell
pnpm install
```

How to run the app (development)

```powershell
pnpm run dev
```

Open http://localhost:5173 to view the app. Vite provides fast HMR and a quick developer feedback loop.

3. Install test dependencies with pnpm and run test

```powershell
npx playwright install
```

```powershell
pnpm run test
```

3. Build, Preview and linter

Build / Preview

```powershell
pnpm run build
pnpm run preview
```

Lint

```powershell
pnpm run lint
```
