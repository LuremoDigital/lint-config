import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import prettier from 'eslint-config-prettier';
import playwright from 'eslint-plugin-playwright';
import vue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';

export const rules = {
    eqeqeq: 'error',
    'func-style': ['error', 'expression'],
    'no-console': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true },
    ],
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/no-deprecated': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
    'vue/block-lang': ['error', { script: { lang: 'ts' } }],
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        { registeredComponentsOnly: true, ignores: [] },
    ],
    'vue/custom-event-name-casing': ['error', 'camelCase', { ignores: [] }],
    'vue/define-emits-declaration': ['error', 'type-based'],
    'vue/define-props-declaration': ['error', 'type-based'],
    'vue/define-props-destructuring': 'error',
    'vue/define-macros-order': [
        'error',
        {
            order: [
                'definePage',
                'defineModel',
                'defineCustom',
                'defineEmits',
                'defineSlots',
            ],
        },
    ],
    'vue/html-button-has-type': [
        'error',
        { button: true, submit: true, reset: true },
    ],
    'vue/html-comment-indent': ['error', 4],
    'vue/max-lines-per-block': [
        'warn',
        { script: 250, template: 250, skipBlankLines: true },
    ],
    'vue/max-props': ['warn', { maxProps: 10 }],
    'vue/next-tick-style': ['error', 'promise'],
    'vue/no-deprecated-delete-set': 'error',
    'vue/no-duplicate-attr-inheritance': [
        'error',
        { checkMultiRootNodes: true },
    ],
    'vue/no-empty-component-block': 'error',
    'vue/no-ref-object-reactivity-loss': 'error',
    'vue/no-required-prop-with-default': ['error', { autofix: false }],
    'vue/no-unused-emit-declarations': 'error',
    'vue/no-use-v-else-with-v-for': 'error',
    'vue/no-useless-v-bind': [
        'error',
        { ignoreIncludesComment: false, ignoreStringEscape: false },
    ],
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/prefer-define-options': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',
    'vue/prefer-use-template-ref': 'error',
    'vue/require-typed-ref': 'error',
    'vue/slot-name-casing': ['error', 'camelCase'],
    'vue/v-bind-style': ['error', 'shorthand', { sameNameShorthand: 'always' }],
    'no-restricted-imports': [
        'error',
        {
            patterns: [
                {
                    group: ['./*', '../*'],
                    message: 'Please use absolute paths instead.',
                },
            ],
        },
    ],
    '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'if', next: '*' },
    ],
};

/** @type {import('./eslint.d.ts').default} */
const createConfig = ({
    globals: customGlobals = undefined,
    playwrightTestFiles = ['src/tests/**'],
    project = ['./tsconfig.app.json', './tsconfig.node.json'],
    tsConfig = 'recommended',
} = {}) =>
    defineConfig(
        js.configs.recommended,
        ...ts.configs[tsConfig],
        ...ts.configs.stylisticTypeChecked,
        ...vue.configs['flat/recommended'],
        ...tanstackQuery.configs['flat/recommended'],
        {
            plugins: {
                'typescript-eslint': ts.plugin,
                '@stylistic': stylistic,
            },
            languageOptions: {
                globals: {
                    ...globals.browser,
                    ...customGlobals,
                },
                parserOptions: {
                    parser: ts.parser,
                    project,
                    extraFileExtensions: ['.vue'],
                    sourceType: 'module',
                },
            },
            rules,
        },
        // eslint-config-prettier switches off every rule Prettier owns,
        // including these two, which do not conflict with it.
        prettier,
        {
            rules: {
                curly: 'error',
                'vue/html-self-closing': ['error', { html: { void: 'any' } }],
            },
        },
        {
            ...playwright.configs['flat/recommended'],
            files: playwrightTestFiles,
        },
    );

export default createConfig;
