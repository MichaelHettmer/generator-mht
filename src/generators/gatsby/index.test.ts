import path from 'path';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import axios from 'axios';
import { Answers } from './index';

describe('mht:gatsby', () => {
    it('successfully copies all files into destination in local mode without network requests', async () => {
        const post = jest.spyOn(axios, 'post');
        const get = jest.spyOn(axios, 'get');

        const result = await helpers
            .run(path.join(__dirname, '../../../generators/gatsby'))
            .withOptions({ local: true, 'skip-signing': true, 'skip-installation': true })
            .withPrompts({
                ci: 'GitLab',
                repo: 'GitLab',
            } as Partial<Answers>);
        assert.ok(result, 'generator result is invalid');
        assert.file([
            '.gitignore',
            '.all-contributorsrc',
            '.commitlintrc.js',
            '.gitattributes',
            'CONTRIBUTING.md',
            '.huskyrc.js',
            '.npmrc',
            'CODE_OF_CONDUCT.md',
            'LICENSE',
            'README.md',
            'lint-staged.config.js',
            '.eslintignore',
            '.eslintrc.js',
            '.stylelintrc.json',
            '.prettierignore',
            '.prettierrc.js',
            '.releaserc',
            'package.json',
            '.vscode',
            '.github',
        ]);
        assert.noFile('.gitlab-ci.yml');

        expect(post).not.toHaveBeenCalled();
        expect(get).toHaveBeenCalledTimes(1);
    }, 60000);
});
