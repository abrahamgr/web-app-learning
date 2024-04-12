# Tailwind CSS

We will create a SPA application with [Vite + React](https://vitejs.dev/) and [Tailwind](https://tailwindcss.com/).

Requirements:

- VSCode
- Node.js 20.x
  - nvm or any other Node version manager (optional but highly recommended).
  - [Windows](https://github.com/coreybutler/nvm-windows) / [MacOS|Linux](https://github.com/nvm-sh/nvm)
- VSCode extension - [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - click [here](vscode:extension/bradlc.vscode-tailwindcss) to install.
- [Prettier plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) - click [here](vscode:esbenp.prettier-vscode) to install Prettier extension.

## Create SPA app

On you personal report create a SPA with React + Typescript by running the following command.

```bash
# create project
npm create vite@latest 03-tailwind -- --template react-ts
# move into the folder
cd 03-tailwind
# install dependencies
npm i
```

Change the port to 3000 to run the app.

```typescript
// vite.config.ts
server: {
  port: 3000
}
```

## Install tailwind

```bash
# install dependencies
npm install -D tailwindcss postcss autoprefixer
```

## Setup Tailwind

Add the following file `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
```

Add the file `postcss.config.cjs` with:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Replace all content of `src/index.css` with:
Or you can comment all existing CSS to have as reference.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Add the CSS to the HTML by adding the following content to `index.htmlk`.

```html
<link href="./src/index.css" rel="stylesheet" />
```

Remove all css imports from `src/App.tsx` and `src/main.tsx`.

## Change styles

Add these classes to the body: `flex m-0 place-items-center min-w-[320px] min-h-[100vh]`.

## Run the app

```bash
npm run dev
```

Apply all previous CSS with Tailwind.

## Setup Prettier + Tailwind

Optionally you could add a prettier plugin for tailwind.

https://github.com/tailwindlabs/prettier-plugin-tailwindcss

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

Add Prettier plugin config `prettier.config.js`:

```javascript
/** @type {import("prettier").Config} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
```

Add VSCode settings on `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
