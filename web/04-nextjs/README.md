## Zod

[https://zod.dev/](https://zod.dev/)

It's very helpful to validate schemas on API and server actions.

Install zod

```bash
npm add zod
```

Create schema

```bash
import { z } from 'zod'

const feedbackSchema = z.object({
  name: z.string().min(5),
  subject: z.string(),
  comments: z.string().optional(),
})
```

Custom messages

```bash
import { z } from 'zod'

const feedbackSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name should be string',
      required_error: 'Name is required',
    })
    .min(5, {
      message: 'Name is required at least 5 characters',
    }),
  subject: z.string(),
  comments: z.string().optional(),
})
```

It's very similar to Typescript to work with properties, please take a look at [zod Objects](https://zod.dev/?id=objects)

Expect exact key names with [.strict](https://zod.dev/?id=strict)

Example of using a form to submit to an internal API.
[/api/feedback/route.ts](./src/app/api/feedback/route.ts)

## ESLint and Prettier

Install extensions

Add the following file at the root of your project to suggest ESLint and Prettier Extensions.

Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

```json
// .vscode/extensions.json
{
  "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
}
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

Install the following packages

```bash
# prettier + tailwing
npm add -D prettier eslint-config-prettier eslint-plugin-prettier prettier-plugin-tailwindcss
# typescript + accesibility
npm add -D @typescript-eslint/eslint-plugin eslint-plugin-jsx-a11y
```

Add prettier config `prettier.config.js` at the root of your project

```js
/** @type {import("prettier").Config} */
const config = {
  singleQuote: true, // decide if you want to use single quotes
  semi: false, // decide if you want to add semicolon at the end
  plugins: ['prettier-plugin-tailwindcss'], // help us to change order automatically for Tailwind
  jsxSingleQuote: true, // decide if you want to add single quotes for JSX
}

export default config
```

Add the following configuration to `.eslintrc.json`

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "next"
  ],
  "plugins": ["@typescript-eslint", "jsx-a11y"],
  "rules": {}
}
```

Add the scipts below to the `package.json` in the `scripts` section

```json
// .eslintrc.json
{
  "lint": "next lint",
  "lint:": "next lint --fix"
}
```

### Next ESLint rules

This plugin provides some rules specific for Next.js, pelase take a look at them
[https://nextjs.org/docs/app/building-your-application/configuring/eslint#eslint-plugin](https://nextjs.org/docs/app/building-your-application/configuring/eslint#eslint-plugin)

## Lint staged + Husky hooks

This will help us to format code when making commits

### Husky

Install [Husky](https://typicode.github.io/husky/)

```bash
npm add -D husky
```

Modify a script to the `package.json` in `scripts` section to enable hooks and avoid and error when installeing packages on CI/CD

```json
  // adjust your folder of your project
  "prepare": "cd .. && husky 04-nestjs-rick-and-morty/.husky || true"
```

Run the command we just created to initialize Husky properly

```bash
npm run prepare
```

Go to the file created at `.husky/pre-commit` and add the content based on your project (only one option).

```bash
# use this if your project is at the root of your repo
npx lint-staged
# use this if your project inside a folder of your repo
cd 04-nestjs-rick-and-morty && npx lint-staged
```

### lint-staged

Install package

```bash
npm add -D lint-staged
```

Add lint-staged configuration

```js
// .lintstagedrc.mjs
import path from 'path'

/**
 * Generates command to run 'next lint' properly
 * @param {*} filenames
 * @returns command
 */
const nextEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

export default {
  '*.{js,ts,tsx}': [nextEslintCommand],
  '*.{json,css}': 'prettier -w',
}
```

You can run multiple linters by extensions and multiple commands, please take a look at [https://github.com/lint-staged/lint-staged?tab=readme-ov-file#task-concurrency](https://github.com/lint-staged/lint-staged?tab=readme-ov-file#task-concurrency)

To test Husky and lint-staged add the following to `.husky/pre-commit` hook only for testing purposed, then you can remove it and commit your changes.

```bash
lint-staged
## this will prevent to commmit your changes for testing purposes
exit 1
```

## Fix your code

Now everthing is setup you can run `npm run lint` to view all changes you need to attend. Some of them can be fixed automatically by running `npm run lint:fix`, go ahead and run these commands in order to have clean code and then fix manually rest of errors.

```bash
# first take a look at the errors/warnings
npm run lint
# fix some of them, not all can be fixed
npm run lint:fix
```

Then you are ready to commit and push your changes.

## ESLint plugin Docs

[ESLint](https://eslint.org/docs/v8.x/)

[Prettier](https://prettier.io/)

[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)

[prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

[@typescript-eslint/eslint-plugin](https://typescript-eslint.io/)

[eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
