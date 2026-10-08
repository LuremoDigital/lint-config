import assert from 'node:assert/strict';
import path from 'node:path';
import { test } from 'node:test';
import createConfig, { rules } from '../eslint.js';
import { ESLint } from 'eslint';

const fixtures = path.join(import.meta.dirname, 'fixtures');

const lint = async (file) => {
    const eslint = new ESLint({
        cwd: fixtures,
        overrideConfigFile: true,
        overrideConfig: createConfig({
            project: [path.join(fixtures, 'tsconfig.json')],
        }),
    });
    const [result] = await eslint.lintFiles([path.join(fixtures, file)]);

    return result.messages.map((message) => message.ruleId ?? message.message);
};

test('flags the custom rules in TypeScript', async () => {
    const found = await lint('src/bad.ts');

    for (const rule of [
        'no-restricted-imports',
        'func-style',
        'eqeqeq',
        'curly',
        '@stylistic/padding-line-between-statements',
    ]) {
        assert.ok(found.includes(rule), `${rule} not reported: ${found}`);
    }
});

test('flags the custom rules in Vue', async () => {
    const found = await lint('src/Bad.vue');

    for (const rule of ['vue/block-order', 'vue/html-button-has-type']) {
        assert.ok(found.includes(rule), `${rule} not reported: ${found}`);
    }
});

test('passes clean code', async () => {
    assert.deepEqual(await lint('src/value.ts'), []);
});

test('applies custom globals and Playwright files', async () => {
    const eslint = new ESLint({
        overrideConfigFile: true,
        overrideConfig: createConfig({
            globals: { google: 'readonly' },
            playwrightTestFiles: ['tests/**'],
        }),
    });
    const config = await eslint.calculateConfigForFile('tests/a.spec.ts');

    assert.equal(config.languageOptions.globals.google, 'readonly');
    assert.ok(
        Object.keys(config.rules).some((rule) =>
            rule.startsWith('playwright/'),
        ),
    );
});

test('exports the custom rules', () => {
    assert.deepEqual(rules.eqeqeq, 'error');
});
