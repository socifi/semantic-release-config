const commitAnalyzer = require('@semantic-release/commit-analyzer');
const {
    CHANGED,
    FIXED,
    REMOVED,
    ADDED,
    DEPRECIATED,
    DOCS,
} = require('@socifi/commitlint-config/src/types');

module.exports = (settings, {commits, logger}) => {
    if (commits[0].subject.indexOf('[NO_RELEASE]') >= 0) {
        return null;
    }
    return commitAnalyzer({
        releaseRules: [
            {type: CHANGED, release: 'minor'},
            {type: FIXED, release: 'patch'},
            {type: REMOVED, release: 'major'},
            {type: ADDED, release: 'minor'},
            {type: DEPRECIATED, release: 'minor'},
            {type: DOCS, release: 'patch'},
        ]
    }, {commits, logger});
};
