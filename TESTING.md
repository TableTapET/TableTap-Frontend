# TableTap Frontend Testing Guide

This document provides comprehensive information about testing the TableTap Frontend application.

---

## Overview

The TableTap Frontend uses **Jest** and **React Testing Library (RTL)** for testing, with seamless integration into the Next.js App Router environment. Tests are organized closely with their respective components and cover unit testing, component rendering, and user interaction scenarios.

---

## Test Structure

```text
TableTap-Frontend/
├── src/
│   ├── app/
│   │   ├── __tests__/
│   │   │   └── Home.test.tsx             # Initial page test file                  
├── jest.config.ts                        # Jest & Next.js compiler configuration
├── jest.setup.ts                         # Custom DOM matchers setup
├── package.json                          # NPM test scripts
└── TESTING.md                            # This file
```

---

## Running Tests

### Using NPM Scripts (Local)
The `package.json` file provides convenient ways to run different types of tests. Ensure dependencies are installed before running.

```bash
# Run all tests once
npm run test

# Run tests in watch mode (updates automatically on file save)
npm run test:watch

# Run tests with coverage report (requires adding --coverage to the script)
npm run test -- --coverage

# Run a specific test file
npm run test -- Home.test.tsx
```

### Using Docker (Containerized)
Because the frontend is containerized for development, you can run tests directly inside the running Docker container to ensure environment consistency:

```bash
# Run tests inside the running container
docker exec -it TableTap-frontend-dev npm run test

# Run tests in watch mode inside the container
docker exec -it TableTap-frontend-dev npm run test:watch
```

---

## Test Features

### Comprehensive Coverage
Each test file aims to include:
* **Rendering Cases:** Testing that components mount without crashing.
* **Interaction Tests:** Testing user events (clicks, typing, form submissions).
* **Accessibility Tests:** Ensuring elements can be queried by ARIA roles.
* **State Management:** Testing UI changes based on state updates.
* **Mocked Routing:** Testing Next.js navigation and router hooks.
* **Error Boundaries:** Testing UI behavior when props or data are missing.

### Test Utilities
* **`render`:** Mounts the React component into a virtual DOM.
* **`screen`:** Utility for querying the virtual DOM (e.g., `screen.getByRole`).
* **`userEvent` / `fireEvent`:** Simulates user interactions.
* **`@testing-library/jest-dom`:** Provides custom matchers like `toBeInTheDocument()`.

---

## Test Configuration

### `jest.config.ts`
The Jest configuration leverages `next/jest` and includes:
* Automatic SWC compilation for TypeScript and React.
* Module name mapping for absolute imports (e.g., handling `@/components`).
* JSDOM test environment to simulate browser APIs.
* Setup file inclusion (`jest.setup.ts`).

### `jest.setup.ts`
This file runs before each test suite and includes:
* Global imports for extended DOM assertions (`@testing-library/jest-dom`).
* Global mocks for specific browser APIs if required.

---

## Best Practices

### Writing Tests
* **Query by Role:** Always prefer `screen.getByRole()` or `screen.getByText()` over querying by CSS classes or test IDs. This enforces accessibility.
* **Arrange-Act-Assert:** Structure tests with clear sections (setup component -> simulate event -> expect outcome).
* **Mock External Boundaries:** Mock API calls and backend websockets. Frontend tests should not rely on the Django backend being live.
* **Descriptive Names:** Use clear `describe` blocks for components and `it`/`test` blocks for specific behaviors.

### Test Organization
* **Colocation:** Place tests near the components they test. Use `__tests__` directories or name files `[component].test.tsx`.
* **Component Isolation:** Test complex components in isolation before testing them as part of a larger page layout.
* **Cleanup:** RTL automatically unmounts components after each test, but ensure any custom global mocks are reset in `afterEach` blocks.

---

## Troubleshooting

### Common Issues
* **"Unable to find an accessible element":** The element might not be rendered yet. Use `await screen.findByRole()` for asynchronous rendering.
* **"Warning: An update to Component inside a test was not wrapped in act(...)":** State updated asynchronously outside of a testing utility. Ensure user interactions and renders are properly awaited.
* **Docker Execution Fails:** Ensure the container is actively running (`docker ps`) before executing the `docker exec` command.
* **Module Not Found:** Verify that `jest.config.ts` correctly maps the path aliases defined in your `tsconfig.json`.

### Debugging Tests
* **Print the DOM:** Use `screen.debug()` inside your test to print the current HTML structure to the terminal.
* **Watch Mode:** Use `npm run test:watch` to quickly iterate on failing tests.

---

## Contributing

When adding new frontend tests:
* Follow existing testing patterns and RTL best practices.
* Prioritize accessibility-first querying.
* Ensure tests pass in the GitHub Actions CI pipeline before requesting a PR review.
* Avoid testing implementation details (like exact CSS classes); test user-visible behavior.

---

## Resources

* [Jest Documentation](https://jestjs.io/docs/getting-started)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
* [Next.js Testing Guide](https://nextjs.org/docs/app/building-your-application/testing)