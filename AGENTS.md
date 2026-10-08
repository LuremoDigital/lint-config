# Maintaining this package

| File          | What it holds                                          |
| ------------- | ------------------------------------------------------ |
| `eslint.js`   | The ESLint flat config factory and the custom rules    |
| `prettier.js` | The Prettier options and plugins                       |
| `test/`       | Fixtures that both configs are linted and formatted on |

Projects pick up a change by updating this package, so every rule, preset or
Prettier option lives here and nowhere else.

## Changing a rule or option

1. Apply the change in `eslint.js` or `prettier.js`. Add or remove a
   dependency when a plugin is added or dropped, and keep the
   `peerDependencies` ranges in line with what the plugins support.
2. Add or adjust a test in `test/` when a rule or option behaves differently.
3. Run `npm test` and `npm run format:check`.
4. Bump this package's version (a removed rule or a new error is a minor
   release at least; anything that breaks a consumer's config is a major).

If a project must deviate, it overrides the rule in its own `eslint.config.js`
or `.prettierrc.js`; this package stays the shared default.

## Code style

- Plain ESM JavaScript with `.d.ts` files next to it; no build step.
- Format with this package's own Prettier config (`npm run format`).
- Prettier plugins are passed as objects named after their package, see the
  comment in `prettier.js`; keep `prettier-plugin-tailwindcss` last.
