const fs = require('fs');

module.exports = (settings, { nextRelease }) => {
    const [title, ...messages] = fs.readFileSync('CHANGELOG.md', 'utf8').split('##');
    fs.writeFileSync('CHANGELOG.md', `${title}${nextRelease.notes}\n##${messages.join('##')}`);
};
