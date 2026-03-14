# TableTap-Frontend

This repository serves for the web version of the wep app.

## Tech Stack

- Framework: [Next.js](https://nextjs.org/)
- UI Library: [Shadcn](https://ui.shadcn.com/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- Language: [TypeScript](https://www.typescriptlang.org/)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- [npm](https://www.npmjs.com/) (v9.x or higher recommended)
- [Git](https://git-scm.com/downloads) (v2.x or higher recommended)

## Getting Started

1. **Clone this repository**:
    ```bash
    git clone https://github.com/TableTapET/TableTap-Frontend.git
    cd TableTap-Frontend
    ```
2. **Install dependencies**:

    ```
    npm install
    ```

3. **Configure environment variables**:
    ```
    cp .env.example .env.local
    ```

## Usage(without docker)

> Running the web application locally may cause issues since it wont be connected to the backend.  
> If you want to run with docker, please use the [deployment setup instructions](https://github.com/TableTapET/TableTap-Deployment/blob/main/README.md) instead.

1. **Running the application locally**
    ```
    npm run dev
    ```
2. Then open the following link in your preferred web-browser:
    ```
    http://localhost:5002
    ```

## Available Scripts

- `npm run dev` → Start the development server.
- `npm run build` → Build the app for production.
- `npm run start` → Start the production server.
- `npm run lint` → Check for linting errors.
- `npm run format` → Fix any formatting errors.

## API Client Layer

All HTTP calls should go through the centralized Axios client at `src/lib/api/client.ts`.

- Import the client from `src/lib/api` and use `apiClient.get/post/put/delete`.
- Do not use direct `fetch`/`axios` calls in components.
- Auth token attachment, 401 refresh, and normalized API errors are handled by interceptors.

### Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` (preferred): Base API URL, for example `http://localhost:5001/api`.
- `NEXT_PUBLIC_BACKEND_URL` (legacy fallback): Used only if `NEXT_PUBLIC_API_BASE_URL` is not set.
- `NEXT_PUBLIC_AUTH_REFRESH_PATH`: Refresh endpoint path. Default is `/auth/token/refresh/`.
- `NEXT_PUBLIC_API_TIMEOUT_MS`: Axios timeout in milliseconds. Default is `15000`.

### Docker Note

When running via docker compose, set `NEXT_PUBLIC_API_BASE_URL` on the frontend service so browser requests target the correct backend URL.
