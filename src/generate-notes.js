const { DateTime } = require('luxon');

module.exports = (settings, { commits, nextRelease }) => {
    const changes = {};

    commits.map((commit) => {
        const [type, ...message] = commit.message.split(':');
        return {
            type: type.trim(),
            message: message.join(':').trim(),
        };
    }).forEach(({ type, message }) => {
        changes[type] = [
            ...(changes[type] || []),
            message,
        ];
    });

    const changesMessage = Object.keys(changes).map((key) => {
        return `### ${key}\n${changes[key].map((message) => {
            return `- ${message.replace(/([A-Z]{2,3}-\d*)/g, '[$1](https://socifi.atlassian.net/browse/$1)')}`;
        }).join('\n')}\n`;
    }).join('\n');

    return `## [${nextRelease.version}] ${DateTime.local().toFormat('yyyy-MM-dd')}\n${changesMessage}`;
};
