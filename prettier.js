import * as sortImports from '@ianvs/prettier-plugin-sort-imports';
import * as organizeAttributes from 'prettier-plugin-organize-attributes';
import * as tailwind from 'prettier-plugin-tailwindcss';

// Prettier imports a plugin named by a string from the directory it runs in,
// which only works where npm happened to hoist the plugin, so they are passed
// as objects. prettier-plugin-tailwindcss finds the sort-imports and
// organize-attributes plugins by package name; a file path does not match on
// Windows, so each object carries its name. The CLI also JSON-serialises the
// resolved options for its debug log, which would run the sort-imports
// plugin's getters for optional parsers it has not got (Ember, oxc) and fail,
// so an object serialises as its name.
const plugin = (name, module) => ({
    ...(module.default ?? module),
    name,
    toJSON: () => name,
});

/** @type {import('prettier').Config} */
export default {
    arrowParens: 'always',
    attributeGroups: [
        '^((v-bind)?:?|v-)is$',
        '^v-for$',
        '^v-(if|else-if|else|show|cloak)$',
        '^v-(once|pre|memo)$',
        '^(v-bind)?:?id$',
        '^(v-bind)?:?key$',
        '^(v-bind)?:?ref$',
        '^(v-)?slot$',
        '^#',
        '^v-model$',
        '^v-(?!bind(:|$)|on(:|$)|html$|text$)',
        '^class$',
        '^(v-bind)?:class$',
        '^((v-bind)?:)?(?!data-|v-|:|@|#)',
        '$DEFAULT',
        '^((v-bind)?:)?data-',
        '^v-bind$',
        '^v-on:',
        '^@',
        '^v-html$',
        '^v-text$',
    ],
    importOrder: [
        '<THIRD_PARTY_MODULES>',
        '',
        '^@/(.*?)(.vue)$',
        '',
        '^@/(.*)$',
        '',
        '^./(.*?)(.vue)$',
    ],
    overrides: [
        {
            files: '*.yml',
            options: {
                tabWidth: 2,
            },
        },
    ],
    // prettier-plugin-tailwindcss has to come last.
    plugins: [
        plugin('@ianvs/prettier-plugin-sort-imports', sortImports),
        plugin('prettier-plugin-organize-attributes', organizeAttributes),
        plugin('prettier-plugin-tailwindcss', tailwind),
    ],
    printWidth: 80,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    vueIndentScriptAndStyle: true,
};
