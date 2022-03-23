# Create a NPM package

## Prerequisites

- Ensure you've installed Node.js and npm on your machine.
- You need to have a npm account to be able to publish your package. [Sign up here](https://www.npmjs.com/signup).

## Init project

```console
npm init
```

## Install packages to manage typescript

```console
npm i -D typescript @types/node
npx tsc --init
```

The npx command will create a default tsconfig.json file.
We need to update the file, in compilerOptions we add a rule to have a dedicated ile with all our types:

- "declaration": true
- "outDir": "./dist"

We also need to define include and exclude rules at the root:

- "include": ["./src/"],
- "exclude": ["./node_modules", "**/*.spec.ts"]

## Install packages to manage tests (jest and supertest)

```console
npm i -D jest @types/jest supertest @types/supertest ts-jest
npx ts-jest config:init
```

The npx command will create a jest.config.js file which will look like this:

```js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
}
```

## Install some dev dependencies

```console
npm i -D prettier husky
```

Create a "**.prettierrc.json**" file at the root of the project and add basic rules to it.
(This will auto format the code)

```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "semi": false
}
```

Create a "**.prettierignore**" file at the root of the project and add basic rules to it.
(This will revent lint:format commanf to format build files)

```
dist/
package-lock.json
```

## Update package.json

```json
  "type": "module",
  "types": "dist/index.d.ts",
  "scripts": {
    "build:clean": "rm -rf dist && mkdir dist",
    "build": "npm run build:clean && tsc",
    "lint:format": "prettier --write .",
    "prepublishOnly": "npm run build && npm run lint:format",
    "test": "jest"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint:format"
    }
  },
```

- The module type will allow us to use es6 fonctionnalties
- The exports object allow us to target the lib we want to use according if we use ES5 or ES6
- The build command will transpile code in es5
- The lint:format will use prettier to format all codes
- The prepublishOnly command will create a new build just before publishing to npm
- The test command will run test files
- The husky object will run lint-format just before a git commit

For more information for all options available in the package.json, you can check the [NPM documentation for package.json file](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).

## Code the library

Export the library in the "**main**" file defined in package.json (default: index.js)
(Assuming the project is called super-package)

```js
import SuperPackage from './src/SuperPackage.js'
export default SuperPackage
```

## Test the package before publishing

In the root project directory, run the following command:

```console
npm link
```

In an existing project directory, or a new directory where you wish to test this npm package, run the following command:

```console
npm link super-package
```

(assuming the project already has a package.json and that our package is called super-package)

you can now import and use the package in the project

```js
import SuperPackage from 'super-package'
```

## Publish the package

At the root of the npm package directory, make sure you are logged into npm to ensure you can publish.

```console
npm login
```

(Enter your username, password and email)

**Warning**: Ensure that you have incremented the version number in package.json

Now we can publish our package:

```console
npm publish
```

## Security

If you set the **private** value to **true**, the project won't be able to be published publicly to the npm repository. This is useful if you want to prevent accidentally publishing a project to the world.

## Bonus

### NP package

Install the package [np](https://www.npmjs.com/package/np) which will do some check before publishing a new package version.

```console
npm i -D np
```

![verifying steps](https://github.com/sindresorhus/np/blob/HEAD/screenshot.gif?raw=true)

![increment version](https://github.com/sindresorhus/np/blob/HEAD/screenshot-ui.png?raw=true)

### Compile ES6 using babel and webpack

A really great github post on [how to compile code for the browser or node with babel and webpack](https://gist.github.com/ncochard/6cce17272a069fdb4ac92569d85508f4)
