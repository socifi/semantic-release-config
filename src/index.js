module.exports = {
    generateNotes: './generate-notes.js',
    prepare: [
        './update-changelog.js',
        {
            path: '@semantic-release/git',
            assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
            // eslint-disable-next-line no-template-curly-in-string
            message: 'Commit changelog of version ${nextRelease.version}\n\n${nextRelease.notes}',
        },
        '@semantic-release/npm',
    ],
    analyzeCommits: {
        releaseRules: [
            { type: 'Changed', release: 'minor' },
            { type: 'Fixed', release: 'patch' },
            { type: 'Removed', release: 'major' },
            { type: 'Added', release: 'minor' },
            { type: 'Depreciated', release: 'minor' },
            { type: 'Docs', release: 'patch' },
        ],
    },
};
