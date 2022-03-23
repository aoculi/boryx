# Boryx

A node framework for educational purposes

## Installation

```console
npm i boryx
```

## Basic Usage

```js
import Boryx from 'boryx'

const Api = new Boryx()

Api.get('/', (req, res) => {
  res.end(JSON.stringify({ Hello: 'world' }))
})

Api.run((opts) => console.log(`App listening on port ${opts.port}`))
```

## Documentation

- [Create a NPM package](npm-package.md)
- [Basic Typescript types](types.md)

## License

The Boryx framework is freely distributable under the terms of the [MIT license](LICENSE.md).
