# Create a NPM package

## Before starting

In this documentation, the code is written in pure ES6 Javascript. In order to allow users to fetch the library with **require**, we compile the code thanks to a collection of babel plugins.
In a future version, the code will be directly written in typescript, so the compilation will be easier.

## Prerequisites

- Ensure you've installed Node.js and npm on your machine.
- You need to have a npm account to be able to publish your package. [Sign up here](https://www.npmjs.com/signup).

## Init project

```console
npm init
```

## Install packages to manage tests (jest and supertest)

```console
npm i -D jest @types/jest supertest
```

## Install (a lot of) babel packages to transpile ES6 to ES5

```console
npm i -D babel-jest @babel/preset-env @babel/cli @babel/core @babel/plugin-transform-runtime babel-plugin-add-module-exports
```

To transpile the code in ES5, create a "**babel.config.cjs**" file to the root of the project with this content:

```js
module.exports = {
  presets: [['@babel/preset-env']],
  plugins: [['@babel/transform-runtime'], ['add-module-exports']],
}
```

This config file will be used by Jest and the build command.

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
  "exports": {
    "import": "./index.js",
    "require": "./dist/SuperPackage.cjs"
  },
  "scripts": {
    "build:clean": "rm -rf dist && mkdir dist",
    "build:run": "babel src/SuperPackage.js -s --out-file dist/SuperPackage.cjs",
    "build": "npm run build:clean && npm run build:run",
    "lint:format": "prettier --write .",
    "prepublishOnly": "npm run build && lint:format",
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
