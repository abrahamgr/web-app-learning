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
npm add -D prettier eslint-config-prettier eslint-plugin-prettier prettier-plugin-tailwindcss
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

Add `plugin:prettier/recommended` to the extends section on `.eslintrc.json`

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "plugin:prettier/recommended", "next"],
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

###
