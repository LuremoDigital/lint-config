import assert from 'node:assert/strict';
import path from 'node:path';
import { test } from 'node:test';
import { format, resolveConfig } from 'prettier';

// Resolved the way a project resolves it: through a .prettierrc.js that
// re-exports this package, so overrides apply too.
const fixtures = path.join(import.meta.dirname, 'fixtures');
const formatAs = async (file, source) => {
    const filepath = path.join(fixtures, file);

    return format(source, { ...(await resolveConfig(filepath)), filepath });
};

test('sorts imports into groups', async () => {
    const output = await formatAs(
        'src/main.ts',
        [
            "import Button from '@/components/Button.vue'",
            "import { useStore } from '@/stores/store'",
            'import { ref } from "vue"',
            '',
            'export { Button, ref, useStore }',
        ].join('\n'),
    );

    assert.equal(
        output,
        [
            "import { ref } from 'vue';",
            '',
            "import Button from '@/components/Button.vue';",
            '',
            "import { useStore } from '@/stores/store';",
            '',
            'export { Button, ref, useStore };',
            '',
        ].join('\n'),
    );
});

test('orders Vue attributes and Tailwind classes', async () => {
    const output = await formatAs(
        'src/App.vue',
        [
            '<template>',
            '<div @click="go" class="p-4 flex" v-if="show" id="box"></div>',
            '</template>',
        ].join('\n'),
    );

    assert.equal(
        output,
        [
            '<template>',
            '    <div v-if="show" id="box" class="flex p-4" @click="go"></div>',
            '</template>',
            '',
        ].join('\n'),
    );
});

test('indents YAML with two spaces', async () => {
    assert.equal(
        await formatAs('config.yml', 'a:\n    b: 1\n'),
        'a:\n  b: 1\n',
    );
});
