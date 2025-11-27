# Corte Inglés — React test (Example)

This is a small React + TypeScript + Vite example project used for a coding exercise / component testing. It contains a simple Todo-like app.

Key project highlights

- Code: TypeScript + React (Vite)
- State: using `zustand` for an extremely small items store
- Components: card + button components in `src/components`

Quick links

- App source: `src/App.tsx`
- Card component: `src/components/card/Card.tsx`
- Button component: `src/components/button/Button.tsx`

Prerequisites

- > Node.js 18+ (recommended)
- pnpm (preferred package manager for this repo)

Setup & install

1. Get to the repository

```powershell
cd corte-ingles-test-react
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

Build / Preview

```powershell
pnpm run build
pnpm run preview
```

Lint

```powershell
pnpm run lint
```
