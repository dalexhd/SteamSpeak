---
id: contributing
title: Contributing
---

# Contributing to SteamSpeak

[SteamSpeak](https://dalexhd.github.io/SteamSpeak/) is a tool that power ups your TeamSpeak3 server. If you're interested in contributing to SteamSpeak, hopefully this document makes the process for contributing clear.

The [Open Source Guides](https://opensource.guide/) website has a collection of resources for individuals, communities, and companies who want to learn how to run and contribute to an open source project. Contributors and people new to open source alike will find the following guides especially useful:

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Building Welcoming Communities](https://opensource.guide/building-community/)


## Get Involved

There are many ways to contribute to SteamSpeak, and many of them do not involve writing any code. Here's a few ideas to get started:

- Simply start using SteamSpeak. Go through the [Getting Started](https://dalexhd.github.io/SteamSpeak/docs/setup/installation) guide. Does everything work as expected? If not, we're always looking for improvements. Let us know by [opening an issue](#reporting-new-issues).
- Look through the [open issues](https://github.com/dalexhd/steamspeak/issues). Provide workarounds, ask for clarification, or suggest labels.
- If you find an issue you would like to fix, [open a pull request](#your-first-pull-request). Issues tagged as [_Good first issue_](https://github.com/dalexhd/steamspeak/labels/Good%20first%20issue) are a good place to get started.
- Read through the [SteamSpeak docs](https://dalexhd.github.io/SteamSpeak/docs/setup/installation). If you find anything that is confusing or can be improved, you can make edits by clicking "Edit" at the end of most docs.
- Take a look at the [features requested](https://github.com/dalexhd/steamspeak/labels/enhancement) by others in the community and consider opening a pull request if you see something you want to work on.

### Join our Discord Channel

We have `#steamspeak-dev` on [Discord](https://discord.gg/EcPkJP) to discuss all things SteamSpeak development.

## Development Process

SteamSpeak uses [GitHub](https://github.com/dalexhd/steamspeak) as its source of truth. All changes will be public from the beginning.

When a change made on GitHub is approved, it will be checked by our continuous integration system, Travis CI and Github Actions.

### Branch Organization

SteamSpeak has three primary branches: `master`, `dev` and `gh-pages`.

`master` is where our code lives. We will do our best to keep `master` in good shape, with tests passing at all times.

`dev` is where the development takes place.

`gh-pages` contains the [SteamSpeak documentation](https://dalexhd.github.io/SteamSpeak/). This branch is pushed to by Travis CI and not generally managed manually.

## Bugs

We use [GitHub Issues](https://github.com/dalexhd/steamspeak/issues) for our public bugs. If you would like to report a problem, take a look around and see if someone already opened an issue about it. If you a are certain this is a new, unreported bug, you can submit a [bug report](#reporting-new-issues).

You can also file issues as [enhancements](https://github.com/dalexhd/steamspeak/labels/enhancement). If you see anything you'd like to be implemented, create an issue with [feature template](https://raw.githubusercontent.com/dalexhd/steamspeak/master/.github/ISSUE_TEMPLATE/feature.md)

## Reporting New Issues

When [opening a new issue](https://github.com/dalexhd/steamspeak/issues/new/choose), always make sure to fill out the issue template. **This step is very important!** Not doing so may result in your issue not managed in a timely fashion. Don't take this personally if this happens, and feel free to open a new issue once you've gathered all the information required by the template.

- **One issue, one bug:** Please report a single bug per issue.
- **Provide reproduction steps:** List all the steps necessary to reproduce the issue. The person reading your bug report should be able to follow these steps to reproduce your issue with minimal effort.

## Installation

1. Ensure you have [NodeJS](https://nodejs.org/) installed.
1. After cloning the repository, run `npm install` in the root of the repository.
1. To start a development server:
  - run `make config`
  - edit `src/backend/config` config files
  - run `npm run start:frontend`
  - run `npm run start:backend`

## Online one-click setup for contributing

You can use Gitpod (a free, online, VS Code-like IDE) for contributing. With a single click it will launch a workspace:
  - run `make config`
  - edit `src/backend/config` config files
  - run `npm run start:frontend`
  - run `npm run start:backend`

So that you can start contributing straight away.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/dalexhd/steamspeak)

## Pull Requests

### Your First Pull Request

So you have decided to contribute code back to upstream by opening a pull request. You've invested a good chunk of time, and we appreciate it. We will do our best to work with you and get the PR looked at.

Working on your first Pull Request? You can learn how from this free video series:

[**How to Contribute to an Open Source Project on GitHub**](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

We have a list of [beginner friendly issues](https://github.com/dalexhd/steamspeak/labels/good%20first%20issue) to help you get your feet wet in the SteamSpeak codebase and familiar with our contribution process. This is a great place to get started.

### Sending a Pull Request

Small pull requests are much easier to review and more likely to get merged. Make sure the PR does only one thing, otherwise please split it. It is recommended to follow this [commit message style](#semantic-commit-messages).

Please make sure the following is done when submitting a pull request:

1. Fork [the repository](https://github.com/dalexhd/steamspeak) and create your branch from `master`.
1. Make sure your code lints (`npm run lint:frontend && npm run lint:backend`).
1. Make sure your Jest tests pass (`npm run test:frontend && npm run test:backend`).

All pull requests should be opened against the `master` branch.

#### Breaking Changes

When adding a new breaking change, follow this template in your pull request:

```md
### New breaking change here

- **Who does this affect**:
- **How to migrate**:
- **Why make this breaking change**:
- **Severity (number of people affected x effort)**:
```

### What Happens Next?

We are monitoring for pull requests. Do help us by keeping pull requests consistent by following the guidelines above.

## Style Guide

[Prettier](https://prettier.io) will catch most styling issues that may exist in your code. You can check the status of your code styling by simply running `npm run lint:frontend && npm run lint:backend`.

However, there are still some styles that Prettier cannot pick up.

## Semantic Commit Messages

See how a minor change to your commit message style can make you a better programmer.

Format: `<type>(<scope>): <subject>`

`<scope>` is optional

## Example

```
feat: allow overriding of webpack config
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

The various types of commits:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)

Use lower case not title case!

### Code Conventions

#### General

- **Most important: Look around.** Match the style you see used in the rest of the project. This includes formatting, naming files, naming things in code, naming things in documentation.
- "Attractive"

### Documentation

- Do not wrap lines at 80 characters - configure your editor to soft-wrap when editing documentation.

## License

By contributing to SteamSpeak, you agree that your contributions will be licensed under its MIT license.
