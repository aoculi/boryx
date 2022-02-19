import { createServer } from 'http'
import RouteTree from './utils/RouteTree.js'

export default class Boryx {
  #routes = []
  #options = null
  #server = null

  constructor({
    port = 3000,
    pathRoutes = './routes',
    autoDetectRoutes = false,
  }) {
    this.#options = {
      port,
      pathRoutes,
      autoDetectRoutes,
    }

    if (autoDetectRoutes && pathRoutes) {
      this.findRoutes()
    }
  }

  async findRoutes() {
    const routeTree = new RouteTree(this.#options.pathRoutes)
    await routeTree.parse()
    this.#routes = routeTree.getRoutes()
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

  async #getRoute(req) {
    const route = this.#routes.find((item) => {
      // TODO: How to manage method check in auto discovered routes?
      // Route and request doesn't have the same method
      if (item?.method && item.method !== req.method) return false

      // Perfect match between the request url and the route path
      if (item.path === req.url) return true

      // Route pattern match the request url
      if (item.params.length && req.url.match(item.pattern)) return true

      return false
    })

    if (!route) return null

    // Import route callback
    const importRouteCallback = import('.' + route.filePath)
    const callback = await importRouteCallback.then((res) => res.default)
    route.callback = callback

    return route
  }

  createServer() {
    this.#server = createServer(async (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(200)

      // Find the good route
      const route = await this.#getRoute(req)

      // Return error when route not found
      if (!route) return res.end(JSON.stringify({ error: 'Invalid request!' }))

      // Execute route callback
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
