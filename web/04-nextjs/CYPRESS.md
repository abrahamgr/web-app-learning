# Cypress

- [E2E Testing](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)
- [Component Testing](https://docs.cypress.io/guides/component-testing/overview)
- [Cypress CLI](https://docs.cypress.io/guides/guides/command-line)
- [Intercept Networks Requests](https://docs.cypress.io/guides/guides/network-requests)
- [CI/CD](https://docs.cypress.io/guides/continuous-integration/introduction)
- [Queries](https://docs.cypress.io/api/table-of-contents#Queries)
- [Assertions](https://docs.cypress.io/guides/references/assertions)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)

## Installation

```bash
# install module
npm add -D cypress
```

Add a script to open Cypress

```typescript
// package.json
"cy:open": "cypress open"
"test:cy": "cypress run --browser electron --e2e"
```

`cy:open` will open cypress, so you can interact with, run tests manually or create tests.

`test:cy` will run your E2E tests in headlesss mode, it means it will run without opening Cypress UI.

If you plan to setup with CI please take a look at the [official docs](https://docs.cypress.io/guides/continuous-integration/introduction)

## Configuration

Add a `cypress.config.ts` at the root of your project

```typescript
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // set your App url
    baseUrl: 'http://localhost:3000',
  },
})
```

Add a `tsconfig.json` at `cypress/tsconfig.json`

```json
{
  "include": ["**/*.ts"],
  "compilerOptions": {
    "types": ["cypress"]
  },
  "extends": ["../tsconfig.json"]
}
```

Add an empty file at `cypress/support/e2e.ts` with the following content"

```typescript
// import commands here
```

## Add tests

Then add your tests on `cypress/e2e` folder with the extension of `.cy.ts`

```typescript
// cypress/e2e/home.cy.ts
describe('home page', () => {
  it('have links on page', () => {
    // this opens your app with the `baseUrl` configured in cypress.config.ts
    cy.visit('/')
    // finds a text with the value given
    cy.contains('Characters')
  })
})
```

Then you could open Cypress and run your tests by running `npm run cy:open`.
To help you to write tests you can install [Cypress Chrome Recorder](https://chromewebstore.google.com/detail/cypress-chrome-recorder/fellcphjglholofndfmmjmheedhomgin) or use the [Cypress Studio (Experimental)](https://docs.cypress.io/guides/references/cypress-studio)

## When and where run tests

Here is a good [guide](https://docs.cypress.io/guides/continuous-integration/introduction) to help you to decide what approach you want to take.
I have configured [`start-server-and-test`](https://github.com/bahmutov/start-server-and-test) to compile the app locally (`build` and `start`) then run E2E tests into a controlled environment when the app is up and running on port specified, then this library stops the server.
You could run this on your CI/CD process, example using [GitHub Actions](https://docs.cypress.io/guides/continuous-integration/github-actions) or on the `pre-push` git hook if you want to go further and make sure everything is fine before push changes.

Please read all plugins available to make your life easier.
