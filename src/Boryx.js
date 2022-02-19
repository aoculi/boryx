import { createServer } from 'http'

export default class Boryx {
  #routes = []
  #options = null
  #server = null

  constructor(opts = { port: 3000 }) {
    this.#options = opts
  }

  get(path, callback) {
    this.#routes.push({
      method: 'GET',
      path,
      callback,
    })
  }

  list() {
    return this.#routes
  }

  createServer() {
    this.#server = createServer((req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(200)

      // find the good route
      const route = this.#routes.find(
        (r) => r.path === req.url && r.method === req.method
      )

      // return error when route not found
      if (!route) return res.end(JSON.stringify({ error: 'Invalid request!' }))

      // execute route callback
      return route.callback(req, res)
    })

    return this.#server
  }

  run(callback = null) {
    if (!this.#server) this.createServer()

    this.#server.listen(this.#options.port)

    if (callback) callback(this.#options)
  }

  async close() {
    this.#server.close()
  }
}
