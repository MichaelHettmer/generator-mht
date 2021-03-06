import path from 'path';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import axios from 'axios';
import { Answers } from './index';

describe('mht:docker', () => {
    it('successfully copies all files into destination in local mode without network requests', async () => {
        const post = jest.spyOn(axios, 'post');
        const get = jest.spyOn(axios, 'get');

        const result = await helpers
            .run(path.join(__dirname, '../../../generators/docker'))
            .withOptions({ local: true, 'skip-signing': true, 'skip-git': true, 'skip-installation': true })
            .withPrompts({
                ci: 'CircleCI',
                repo: 'GitHub',
            } as Partial<Answers>);
        assert.ok(result, 'generator result is invalid');
        assert.file([
            '.gitignore',
            '.all-contributorsrc',
            '.commitlintrc.js',
            '.dockerignore',
            '.gitattributes',
            'CONTRIBUTING.md',
            'CODE_OF_CONDUCT.md',
            'LICENSE',
            'lint-staged.config.js',
            'README.md',
            '.npmrc',
            '.releaserc',
            'Dockerfile',
            'package.json',
            '.vscode',
            '.circleci',
            '.github',
        ]);
        assert.noFile(['.gitlab-ci.yml']);

        expect(post).not.toHaveBeenCalled();
        expect(get).toHaveBeenCalledTimes(1);
    }, 60000);
});
