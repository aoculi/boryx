import { createServer, Server } from 'http'

interface Options {
  port: number
}

interface Route {
  method: string
  path: string
  callback: Function
}

export default class Boryx {
  routes: Route[] = []
  options: Options
  server?: Server

  constructor(opts = { port: 3000 }) {
    this.options = opts
  }

  get(path: string, callback: Function): void {
    this.routes.push({
      method: 'GET',
      path,
      callback,
    })
  }

  list() {
    return this.routes
  }

  createServer(): Server {
    this.server = createServer((req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(200)

      // find the good route
      const route = this.routes.find(
        (r) => r.path === req.url && r.method === req.method
      )

      // return error when route not found
      if (!route) return res.end(JSON.stringify({ error: 'Invalid request!' }))

      // execute route callback
      return route.callback(req, res)
    })

    return this.server
  }

  run(callback?: Function): void {
    if (!this.server) this.createServer()

    if (this.server) this.server.listen(this.options.port)

    if (callback) callback(this.options)
  }

  close(): void {
    if (this.server) this.server.close()
  }
}
