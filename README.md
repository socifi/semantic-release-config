# Semantic release config

[![npm version](https://badge.fury.io/js/%40socifi%2Fsemantic-release-config.svg)](https://badge.fury.io/js/%40socifi%2Fsemantic-release-config)
[![CircleCI](https://circleci.com/gh/socifi/semantic-release-config/tree/master.svg?style=shield)](https://circleci.com/gh/socifi/semantic-release-config/tree/master)

Shareable config for deploying javascript projects by [semantic release](https://github.com/semantic-release/semantic-release).

## How to use

Install this config:

```nodemon
npm install @socifi/semantic-release-config --save-dev
```

Create ```release.config.js``` file and put there following content:

```javascript
module.exports = {
    extends: '@socifi/semantic-release-config',
};
```

In npm script you can launch ```semantic-release``` when you want to deploy your app.

## Stages of deploy

Each deployment have following stages:

- **Verify Conditions** - General check that all access token are set and library is ready to deploy.
- **Get last release** - Get all commits that appeared on git since last deploy.
- **Analyze commits** - Based on commit messages determine, which semantic version release or if release at all.
- **Verify release** - General check if everything is ok.
- **Generate notes** - Generate changelog based on commits. Test and InProgress commits will not appear in this.
- **Create Git tag**
- **Prepare** - Update changelog, update npm version, commit changed files and push it to GitHub.
- **Publish** - Publish npm version and release GitHub tag.
- **Success** - Notify about new version in Slack

If you don't want to release commit in master, just add [NO_RELEASE] to commit message.

## Variables on CI

Following variables must be set in CI:

- GH_TOKEN
- GIT_USERNAME
- GIT_EMAIL
- NPM_TOKEN
- SLACK_WEBHOOK
