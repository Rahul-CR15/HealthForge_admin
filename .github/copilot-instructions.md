## Quick context

- This is an Angular 20 application using the "standalone components" pattern. The app is bootstrapped via `bootstrapApplication` in `src/main.ts` and configured with an `ApplicationConfig` in `src/app.config.ts`.
- Primary UI libraries: PrimeNG (themes via `@primeuix/themes` + `providePrimeNG`) and TailwindCSS. Styling entrypoint: `src/assets/styles.scss`.

## Where to look first (entry points)

- `src/main.ts` — bootstraps the app (standalone root component)
- `src/app.config.ts` — ApplicationConfig providers (router, http client, animations, PrimeNG theme)
- `src/app.routes.ts` — top-level routes (uses child routes and lazy-loaded route modules)

Example: lazy route used in `app.routes.ts`

```ts
{ path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') }
```

## Architectural patterns & conventions

- Standalone components: many components declare `standalone: true` and use the `imports` array to bring in `CommonModule`, `RouterModule`, or other standalone components. Follow this pattern when adding new components.
- Router-first structure: `AppLayout` (in `src/app/layout/component/app.layout.ts`) is the top-level layout component with child routes rendered in `<router-outlet>`.
- Feature pages live under `src/app/pages/` and are commonly lazy-loaded via `*.routes` modules (see `uikit`, `pages`, and `auth` routes).
- UI components use PrimeNG's `MenuItem` shape for menus; menu-rendering logic is in `src/app/layout/component/app.menuitem.ts`.

## State & communication patterns

- Uses Angular Signals for local/global layout state: `LayoutService` (see `src/app/layout/service/layout.service.ts`) defines `layoutConfig` and `layoutState` as signals and `computed`/`effect` usages. Prefer reading/updating those signals for layout-related behavior.
- The same `LayoutService` also exposes RxJS `Subject`/`Observable` channels (e.g., `menuSource$`, `overlayOpen$`) for event broadcasting. When integrating new components with the layout, subscribe to these observables or call `layoutService` methods like `onMenuStateChange()`.
- Important: `LayoutService` is declared `@Injectable({ providedIn: 'root' })`, but some components (e.g., `app.menuitem`) include `providers: [LayoutService]` in their decorator. That will create component-scoped instances — be cautious: adding `providers` at component-level can shadow the root instance and lead to duplicate state.

## Theming & dark mode

- Theme is configured via `providePrimeNG({ theme: { preset: Aura, ... } })` in `app.config.ts`.
- Dark mode is toggled by `LayoutService.toggleDarkMode()` which adds/removes `.app-dark` on `document.documentElement`. Other code relies on this class (PrimeNG theme options set `darkModeSelector: '.app-dark'`).

## Common developer workflows (commands)

- Start dev server: `npm start` (runs `ng serve`) — default host http://localhost:4200/
- Build: `npm run build` (uses `ng build`) — output to `dist/sakai-ng`
- Watch build: `npm run watch` (ng build --watch --configuration development)
- Run unit tests: `npm test` (Karma/Jasmine)
- Format: `npm run format` (prettier)

Scripts are in `package.json`.

## Adding a page / route (example)

1. Create a new standalone component (prefer `standalone: true`) under `src/app/pages/<your-page>`.
2. If you want lazy-loading, add a `*.routes.ts` in that folder that exports the routes array and import it via `loadChildren` in `src/app.routes.ts`.
3. Add child routes under `AppLayout` if the page should use the site layout, or add a top-level route for standalone pages (e.g., `/landing`).

## Typical code changes & examples

- Update theme providers: `src/app.config.ts` (use `providePrimeNG`) — the theme preset (Aura) is applied here.
- To react to route changes and update menu state: see `src/app/layout/component/app.menuitem.ts` for `router.events` handling and `LayoutService.onMenuStateChange()` usage.

## Tests, linting, and formatting

- Tests: `ng test` (Karma) — test config is defined in `angular.json` and `tsconfig.spec.json`.
- Lint/format: Prettier is configured; run `npm run format` to keep style consistent.

## Pitfalls & gotchas for automated edits

- Be careful adding `providers: [SomeService]` to component decorators — it creates a new service instance scoped to the component and its children and can diverge from app-wide state.
- This project uses both Signals and RxJS; don't assume a single global state approach. Check `LayoutService` and the target component to see which mechanism is used.
- Menu items often use `routerLink` as an array (e.g., `['/path']`) and rely on `router.isActive(...)` — preserve that shape when creating menu data.

## Quick list of files to reference when editing features

- `src/main.ts` — app bootstrap
- `src/app.config.ts` — global ApplicationConfig & providers
- `src/app.routes.ts` — top-level routing & lazy-loading
- `src/app/layout/service/layout.service.ts` — layout state & events
- `src/app/layout/component/*` — topbar, sidebar, menu, layout composition
- `src/assets/styles.scss` — global styles entry

If any of the above is unclear or you want the instructions tuned for a specific task (e.g., add a new page, change theming, wire an API call), tell me what to target and I will iterate.
