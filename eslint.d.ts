import type { Linter } from 'eslint';

export interface Options {
    /** Extra globals on top of the browser globals. */
    globals?: Linter.Globals;
    /** Files that get the Playwright rules. Default: `['src/tests/**']`. */
    playwrightTestFiles?: string[];
    /** tsconfig files for type-aware rules. Default: `['./tsconfig.app.json', './tsconfig.node.json']`. */
    project?: string | string[];
    /** typescript-eslint preset. Default: `'recommended'`. */
    tsConfig?:
        | 'recommended'
        | 'recommendedTypeChecked'
        | 'strict'
        | 'strictTypeChecked';
}

export const rules: Linter.RulesRecord;

declare const createConfig: (options?: Options) => Linter.Config[];

export default createConfig;
