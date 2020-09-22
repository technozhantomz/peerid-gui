# Streamers Edge

[![JavaScript](https://img.shields.io/badge/</>-JavaScript-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)

> Sonar badges can be retrieved from your SonarCloud dashboard once you have configured it.

## STACK

- React
- [react-hot-loader](https://www.npmjs.com/package/react-hot-loader)
  - React-🔥-Dom
  - Updating translation file contents will not work with hot reloading.
- [Redux](https://redux.js.org/) (single source of truth state management)
- Redux dev tools (allow user to debug )
- React-Router (we use this to control navigation)
- React-Router-Redux (sync React-Router with Redux so we can handle navigation with Redux)
- [ESlint](https://eslint.org/) (to ensure code style consistency)
- Stylelint (to ensure stylesheet consistency)
- [Commitlint](https://www.npmjs.com/package/@commitlint/cli) (to ensure commit message adhere to [Conventional Commits](https://www.conventionalcommits.org))
- SCSS (CSS preprocessor)

## Commits

> If you have run the init script, you can commit via `git cz`.  
> If you have not run the init script, you must commit via `npm run commit`.  
> If you do neither, commit message consistency will be difficult for you.

This repository uses a combination of tools to aid in consistent commit messages. The reason we do this is so we can have dynamic changelog creation and smart semantic versioning based on commits (with the ability to override).

NEVER COMMIT THE .ENV FILE

The following tools are used:

1. [commitizen](https://www.npmjs.com/package/commitizen)  
   Used for prompting recommended entries within a commit message to ensure it contains the necessary information.
   - [conventional changelog](https://www.npmjs.com/package/cz-conventional-changelog)  
     - Prompts for conventional changelog standard.
2. [husky](https://www.npmjs.com/package/husky)  
   By using the hooks from this package we intercept commits being made and verify them with commitlint.
   - Prevent bad commits/pushes.
3. [commitlint](https://www.npmjs.com/package/@commitlint/cli)
   - cli
   - [config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional)
     - rule preset in use

## .ENV Requirements

You must provide the following information in a `.env` file in the root of the repository for full application functionality.

### General

The application itself requires certain criteria to be provided such as the API endpoint for calls to the backend node server API:

```js
DEV_API_ROUTE='http://localhost:3000/'
PRODUCTION_API_ROUTE='http://localhost:3000/'

DEV_BASE_ROUTE='http://localhost:8082'
PRODUCTION_BASE_ROUTE='http://localhost:8082'
```

#### Testnet Connections

Sometimes a testnet connection is required. The `.env` file should have the endpoints declared as a comma delimited string.
ie:

```js
BLOCKCHAIN_ENDPOINTS='endpoint_1, endpoint_2'
```

> spaces are allowed as they will be removed before being set to the application configuration object.


## Releases

This repository uses a [standard version](https://www.npmjs.com/package/standard-version) to aid in version control and release management.

When using standard version to cut a release, there is automated changelog modifitions made based on commit messages.

If you typically use npm version to cut a new release, do this instead:

```shell
npm run release
```

To cut a release and bump the version by major, minor, or patch, use the following respectively:  

```shell
npm run release -- --release-as major
npm run release -- --release-as minor
npm run release -- --release-as patch
```

To cut a pre-release:

```shell
npm run pre-release // v0.2.1 to v0.2.2-rc.0
```

To cut a version for a specific version:

```shell
npm run release -- --release-as <v0.6.7>
```

> Replace the text in the <> with your desired version.

