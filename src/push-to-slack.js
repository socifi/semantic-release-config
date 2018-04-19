const fetch = require('node-fetch');

module.exports = async (
    { repositoryUrl },
    { nextRelease },
) => {
    const packageName = repositoryUrl.replace(/git\+ssh:\/\/git@github\.com\/socifi\/(([a-z]|-)*)\.git/g, '$1');

    const attachement = {
        pretext: `The new version of ${packageName} has been released:`,
        title: nextRelease.version,
        fields: nextRelease.notes
            .split('###')
            .map(value => value.trim())
            .filter((value, key) => key !== 0)
            .map(value => value.split('\n'))
            .map((change) => {
                return {
                    title: change[0],
                    short: false,
                    value: change
                        .filter((value, key) => key !== 0)
                        .join('\n')
                        .replace(/- /g, '')
                        .replace(/\(((\w|:|\/|\.|-)*)\)/g, '')
                        .replace(/\[([A-Z]{2,3}-\d*)\]/g, '$1')
                        .replace(/([A-Z]{2,3}-\d*)/g, '<https://socifi.atlassian.net/browse/$1|$1>'),
                };
            }),
    };

    await fetch(`https://hooks.slack.com/services/${process.env.SLACK_WEBHOOK}`, {
        method: 'POST',
        body: JSON.stringify({ attachments: [attachement] }),
    });
};
