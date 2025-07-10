# General Coding Instructions

## Style and Naming

- Use variable inference (`const`, `let`) whenever possible
- Use descriptive, English names for variables, functions, and components
- Do not add comments in the code
- Do not add JS-Docs in the code
- Prefer arrow functions for callbacks and traditional functions for components
- Use PascalCase for components, camelCase for variables and functions, UPPER_CASE for constants
- If a magic string or number is used more than once, extract it to a constant

## Component Structure

- Order: imports, constants, props/types/interfaces, styled components, component definition, hooks, render, exports
- Prefer functional components with hooks
- Use explicit typing for props and state
- Group related hooks together at the top of the component
- Avoid using `any` types, prefer `unknown` instead
- Use generics for reusable components, especially for hooks
- Use a logic combinator instead of `switch`/`case` for conditional rendering
- Create always a handling function for asynchronous methods that will be used in the component
- Always create an `export default` for the component at the end of the file

## Error Handling

- Use `try`/`catch` for synchronous and asynchronous errors
- Use domain-specific error types when possible
- Prefer `undefined` or `null` over magic values
- Use error boundaries for UI errors
- Show user-friendly error messages

## State Management

- Prefer Redux Toolkit for global state
- Use local state (`useState`, `useReducer`) for component-specific state
- Avoid prop drilling

## API and Side Effects

- Use `fetch` over `axios` for HTTP requests
- Encapsulate API calls in separate files (e.g., `api/` directory)
- Use `useEffect` for side effects
- Handle loading and error states explicitly

# General Testing Instructions

## Style and Naming

- Name test files as `ComponentName.test.tsx` or `hookName.test.ts`
- Name test cases with pattern: `method_scenario_expectedResult`
- Use `describe` and `it`/`test` blocks for structure
- Use `jest` for testing

## Test Structure

- Organize tests in Given/When/Then blocks
- Use `beforeEach` for common setup
- Mock all external dependencies (APIs, modules, context)
- Use `jest.fn()` and `jest.mock()` for mocking

## Required Coverage

- Happy path (successful render/interactions)
- Edge cases and error states
- Validation of props and user input
- Accessibility checks (using `axe` or similar)

# Unit Test Instructions

## Style and Conventions

- Use `jest` and `@testing-library/react`
- Use `screen` and `userEvent` for queries and interactions
- Prefer `expect(...).toBe...` and `expect(...).toHave...` assertions
- Use `jest.spyOn` for function/method mocks
- Use `jest.mock` for module mocks
- Use `jest.fn` for simple function mocks
- Use `toStrictEqual` instead of `toEqual` for deep equality checks

## Structure

- Use `describe` for grouping by method or scenario
- Use `it`/`test` for individual cases
- Use `beforeEach` for setup
- Use `afterEach` for cleanup

# Reference Link:
https://docs.github.com/en/copilot/how-tos/custom-instructions/adding-repository-custom-instructions-for-github-copilot
