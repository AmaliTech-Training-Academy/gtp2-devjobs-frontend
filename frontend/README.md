# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.14.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Application Status Feature

The Application Status page allows users to view, search, and filter their job applications by status. 

### Features
- **Status Filtering:** Use the dropdown to filter applications by status (Applied, Rejected, Reviewed, Interviewed, or All). Filtering is case-insensitive and matches the backend status values.
- **Search:** Use the search box to filter applications by company name, job title, status, or submission date. The search is case-insensitive and works in combination with the status filter.
- **Pagination:** Results are paginated. Use the pagination controls at the bottom to navigate between pages.
- **Refresh:** Click the refresh button to reload applications from the backend and clear the cache.

### Implementation
- The main logic is in `src/app/features/jobs/application-status/application-status.component.ts` and its template `application-status.component.html`.
- Data is fetched from the backend using `ApplicationStatusService` (`src/app/core/services/application-status/application-status.service.ts`).
- Filtering and searching are performed client-side for the loaded page of results.
- Status values are compared in a case-insensitive manner to ensure robust filtering.

## Project Structure

- `src/app/features/jobs/application-status/` - Application status feature (component, template, styles)
- `src/app/core/services/application-status/` - Service for fetching application status data
- `src/app/model/` - TypeScript interfaces and models
- `src/app/shared/` - Shared UI components (pagination, tables, etc.)

## Dependencies & Scripts

Key dependencies:
- Angular 19.x
- PrimeNG (UI components)
- RxJS

Scripts (from `package.json`):
- `ng serve` - Start development server
- `ng build` - Build the project
- `ng test` - Run unit tests

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
