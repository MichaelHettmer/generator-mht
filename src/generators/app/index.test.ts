import path from 'path';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';

describe('mht:app', () => {
    it('successfully starts the generator and returns without an error', async () => {
        const result = await helpers
            .run(path.join(__dirname, '../../../generators/app'))
            .withPrompts({ generator: 'latex' })
            .withOptions({ local: true, 'skip-signing': true });
        assert.ok(result, 'successfully started');
    });
});
