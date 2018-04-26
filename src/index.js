module.exports = {
    generateNotes: './generate-notes.js',
    prepare: [
        // update changelog file
        './update-changelog.js',
        // set version to npm files
        '@semantic-release/npm',
        // commit changed files and push them to GitHub
        {
            path: '@semantic-release/git',
            assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
            // eslint-disable-next-line no-template-curly-in-string
            message: 'Commit changelog of version ${nextRelease.version}\n\n${nextRelease.notes}',
        },
    ],
    success: [
        './push-to-slack.js',
        '@semantic-release/github',
    ],
    verifyConditions: [],
    analyzeCommits: './analyze-commits.js',
};
