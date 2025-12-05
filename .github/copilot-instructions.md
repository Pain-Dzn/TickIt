<!-- Copilot instructions for AI coding agents in the TickIt repo -->
# Copilot / AI Agent Instructions — TickIt

Purpose
- Help AI agents become productive quickly in this React + Vite web app.

Big picture
- App type: React (v18) single-page app scaffolded with Vite. Entry: `src/main.jsx` -> `src/App.jsx`.
- Routing: `react-router-dom` routes declared in `src/App.jsx` (pages under `src/pages`).
- State & data: lightweight client-only state using React Context providers in `src/pages/context`:
  - `EventsProvider` (filters + derived `events` from `src/pages/data/eventsData.js`).
  - `CartProvider` (cart operations; cart items are plain objects with `id`, `eventId`, `price`, `quantity`).
  - `ThemeProvider` (persists theme to `localStorage` under key `tabater-theme`).

Key developer workflows
- Run dev server: `npm run dev` (Vite server runs on port 3000 by default, `vite.config.js`).
- Build: `npm run build` → output to `dist`; preview with `npm run preview`.
- Linting/tests: none detected in repo; do not assume test runners or CI configs exist.

Project-specific conventions and patterns
- File / export style:
  - Components use PascalCase and default exports (e.g., `src/components/Layout/Header.jsx`).
  - `index.js` files re-export submodules (e.g., `src/pages/context/index.js`, `src/components/index.js`).
- Context hooks pattern:
  - Each context exports a `Provider` and a `useX` hook that throws if used outside the provider. Follow the same guard pattern when adding contexts.
  - Example: `useEvents()` throws `new Error('useEvents must be used within EventsProvider')`.
- Data flow:
  - `EventsProvider` holds `allEvents` and exposes `events` (filtered). Filters are kept in context state and updated via `updateFilters`/`clearFilters`.
  - UI components consume the filtered `events` via `useEvents()`.
- Local storage usage:
  - `ThemeProvider` reads/writes `tabater-theme` and applies `data-theme` on `document.documentElement`.
  - A small `useLocalStorage` hook exists at `src/pages/hooks/useLocalStorage.js`; prefer that for new persisted state.
- Styling:
  - Global CSS imports: `src/pages/styles/globals.css` is imported in `App.jsx`.
  - Component styles live alongside pages under `src/pages/styles` and `src/components/*/*.css`.

Integration points & dependencies
- Vite (`vite`) with `@vitejs/plugin-react`. Config: `vite.config.js` (server port, build options).
- `react-router-dom` for navigation; update `src/App.jsx` routes when adding pages.
- `lucide-react` is used for icons.

What to look for when changing behavior
- If changing event data shape, update `src/pages/data/eventsData.js` and the selectors in `EventsContext.jsx` and any consumers (e.g., `EventCard.jsx`, `EventsGrid.jsx`).
- Cart mutation helpers live in `CartContext.jsx` — follow its `setCart(prev => ...)` patterns to preserve concurrency safety.
- Theme toggling touches global attributes; prefer `ThemeProvider` helpers (`toggleTheme`, `setDarkTheme`) rather than manipulating `document` directly.

Typical small tasks — examples
- Add a new page: create `src/pages/NewPage.jsx`, add route in `src/App.jsx`, add styles under `src/pages/styles/pages` and update nav in `Header.jsx`.
- Add a context: copy pattern from `EventsContext.jsx` (createContext, guard hook, Provider exposing `value` object).
- Make event-related changes: modify `eventsData.js`, then adjust filtering logic in `EventsContext.jsx` and update UI components that depend on changed fields.

Notes for the agent
- Preserve existing export patterns and default export conventions.
- Keep changes minimal and consistent with the codebase style. Avoid introducing heavy infra (no tests, no CI changes) unless requested.
- Provide exact file paths when suggesting edits (use backticks). Example: `src/pages/context/CartContext.jsx`.

If anything here is unclear or you want more detail (e.g., a component call graph or a sample PR), tell me which area to expand.

Generated: automated update (review before committing to upstream workflow).
