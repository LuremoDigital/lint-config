# @luremo/lint-config

ESLint and Prettier configuration for Vite, Vue and TypeScript projects. See
[AGENTS.md](AGENTS.md) for how changes to it are made.

## Install

```bash
npm install --save-dev @luremo/lint-config eslint prettier typescript
```

The ESLint and Prettier plugins come with the package.

## ESLint

`eslint.config.js`:

```js
import createConfig from '@luremo/lint-config/eslint';

export default createConfig({
    globals: {
        google: 'readonly',
    },
});
```

| Option                | Default                                           | Description                                       |
| --------------------- | ------------------------------------------------- | ------------------------------------------------- |
| `globals`             | `undefined`                                       | Globals on top of the browser globals.            |
| `playwrightTestFiles` | `['src/tests/**']`                                | Files that get the Playwright rules.              |
| `project`             | `['./tsconfig.app.json', './tsconfig.node.json']` | tsconfig files for the type-aware rules.          |
| `tsConfig`            | `'recommended'`                                   | typescript-eslint preset, for example `'strict'`. |

The custom rules are exported on their own as well:

```js
import { rules } from '@luremo/lint-config/eslint';
```

## Prettier

`.prettierrc.js`:

```js
import config from '@luremo/lint-config/prettier';

export default {
    ...config,
    // Project-specific options, for example Tailwind v4's stylesheet:
    tailwindStylesheet: './resources/css/main.css',
};
```

It sorts imports (`@ianvs/prettier-plugin-sort-imports`), orders Vue and HTML
attributes (`prettier-plugin-organize-attributes`) and sorts Tailwind classes
(`prettier-plugin-tailwindcss`).

## Development

```bash
npm test               # lint and format fixtures with both configs
npm run format:check   # this repository's own formatting
```

Releases are published to npm by `.github/workflows/publish.yml` when a GitHub
release is published; it needs an `NPM_TOKEN` repository secret.
