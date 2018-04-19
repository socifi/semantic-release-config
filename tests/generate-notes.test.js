const { DateTime } = require('luxon');
const generateNotes = require('./../src/generate-notes');

let now = '';

describe('Test generation of changelog', () => {
    beforeEach(() => {
        now = DateTime.local().toFormat('yyyy-MM-dd');
    });

    it('generate changelog', () => {
        expect(generateNotes(undefined, {
            commits: [{ message: 'Changed: Everything.' }],
            nextRelease: { version: 'v1.0.0' },
        })).toEqual(`## [v1.0.0] ${now}\n### Changed\n- Everything.\n`);
    });

    it('skip Test and InProgress in changelog', () => {
        expect(generateNotes(undefined, {
            commits: [{ message: 'Added: Everything.' }, { message: 'Test: Everything.' }, { message: 'InProgress: Everything.' }],
            nextRelease: { version: 'v1.0.0' },
        })).toEqual(`## [v1.0.0] ${now}\n### Added\n- Everything.\n`);
    });
});
