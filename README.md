# Mural challenge

## Stack

- **Runtime / language:** [Node.js](https://nodejs.org/), [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React 18](https://react.dev/), [styled-components](https://styled-components.com/)
- **Build & dev server:** [Vite 5](https://vitejs.dev/)
- **Data fetching:** [TanStack Query](https://tanstack.com/query) — REST client reads notes from [json-server](https://github.com/typicode/json-server) using `fetch`
- **Utilities:** [date-fns](https://date-fns.org/), [nanoid](https://github.com/ai/nanoid)
- **Mock API:** json-server serves `db.json` on port **3000**
- **Unit tests:** [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/react)
- **E2E tests:** [Cypress](https://www.cypress.io/)
- **Linting / formatting:** ESLint (Airbnb + TypeScript + Prettier), Prettier

## How to run

1. **Install Node.js**  
   Use a current LTS version (this repo’s `json-server` dependency may log an engine warning below its stated minimum; use **Node 22.12+** if you want a clean install with no warnings).

2. **Install dependencies** (from the project root):

   ```bash
   npm install
   ```

3. **Start the app and the mock API** in one terminal:

   ```bash
   npm run dev:full
   ```

   This runs Vite on **http://localhost:5173** and json-server on **http://localhost:3000** with `db.json`.

   Alternatively, use two terminals:

   ```bash
   npm run dev
   ```

   ```bash
   npm run mock:server
   ```

4. Open **http://localhost:5173** in the browser.


## Tests

### Unit tests (Jest)

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

### E2E tests (Cypress)

Cypress uses **http://localhost:5173** as `baseUrl`. The UI must load notes from json-server, so **start the stack first** (for example `npm run dev:full`).

Interactive runner (pick browser and specs):

```bash
npm run cypress:open
```

Headless run (CI-style):

```bash
npm run cypress:run
```

The first time you run Cypress on a machine, it may download the Cypress binary; wait until that finishes.
