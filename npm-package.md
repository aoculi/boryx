# Create a NPM package

## Prerequisites

- Ensure you've installed Node.js and npm on your machine.
- You need to have a npm account to be able to publish your package. [Sign up here](https://www.npmjs.com/signup).

## Init project

```console
npm init
```

## Install packages to manage tests (jest and supertest)

```console
npm i -D jest @types/jest babel-jest @babel/preset-env
npm i -D supertest
```

Create a "**babel.config.cjs**" file to the root of the project with this content.
(This will allow test files to run with es6 syntax)

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
}
```

## Install some dev dependencies

```console
npm i -D prettier
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

## Update package.json

Add:

- "type": "module", (allow usage of es6 fonctionnalties)

[NPM documentation for package.json file](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).

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

## Bonus

Install the package [np](https://www.npmjs.com/package/np) which will do some check before publishing a new package version.

```console
npm i -D np
```

![verifying steps](https://github.com/sindresorhus/np/blob/HEAD/screenshot.gif?raw=true)

![increment version](https://github.com/sindresorhus/np/blob/HEAD/screenshot-ui.png?raw=true)
