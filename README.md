# Boryx

A node framework for educational purposes

## Installation

## Basic Usage

```
import Boryx from 'boryx'

const Api = new Boryx()

Api.get('/', (req, res) => {
	res.end(JSON.stringify({ Hello: 'world' }))
})

Api.run((opts) => console.log(`App listening on port ${opts.port}`))
```

## Step to create a framework

### Init project

```console
npm init --yes
npm i -D prettier
```

### Install test package (jest and supertest)

```console
npm i -D jest @types/jest babel-jest @babel/preset-env supertest
```

## License

The Boryx framework is freely distributable under the terms of the [MIT license](LICENSE).
