import fs from 'fs'
import * as nodePath from 'path'

export default class RouteTree {
  #routes = []
  #originalPath = null
  #routeParamsRegex = /(?<=\[).*?(?=\])/g

  constructor(path = null) {
    if (path) this.#originalPath = path
  }

  /**
   *
   * @returns {array} sorted routes by level
   */
  getRoutes() {
    this.#routes = this.#routes.sort((a, b) => (a.level < b.level ? 1 : -1))
    return this.#routes
  }

  /**
   *
   * @param {string} filePath the route path in the project
   * @returns {string} the path route string, without removing the params, ex: /users/[id]
   */
  #getRouteFromFilePath(filePath) {
    let route

    // Remove extension
    route = filePath.replace(nodePath.extname(filePath), '')

    // Remove original path from route
    route = route.replace(this.#originalPath, '')

    // Replace /index by /
    if (route.endsWith('/index')) {
      route = route.substring(0, route.lastIndexOf('/index'))
    }

    // If empty
    if (!route) route = '/'

    return route
  }

  /**
   *
   * @param {string} filePath the route path in the project
   * @returns {object} route information based on file path
   * {
   *   route: '/users/[id]',
   *   params: [ {key: 'id', symbol: '[id]'}, {...} ],
   *   pattern: '/users/(.*?)',
   *   filePath: './routes/users/[id].js',
   *   level: 2
   * }
   */
  #getRouteInfo(filePath) {
    const path = this.#getRouteFromFilePath(filePath)
    const findAllMatch = Array.from(path.matchAll(this.#routeParamsRegex))
    let params = []
    let pattern = path

    findAllMatch.forEach((item) => {
      pattern = pattern.replace(`[${item[0]}]`, '(.*?)')
      params.push({
        key: item[0],
        symbol: `[${item[0]}]`,
      })
    })

    return {
      path,
      params,
      pattern,
      filePath,
      level: path.match(/\//g).length,
    }
  }

  async parse(dir = null) {
    if (!dir) dir = this.#originalPath

    let filenames = await fs.promises.readdir(dir)

    for (const file of filenames) {
      const stat = await fs.promises
        .stat(dir + '/' + file)
        .then((res) => res)
        .catch((err) => err)

      if (stat instanceof Error) {
        continue
      }

      if (stat.isDirectory()) {
        await this.parse(dir + '/' + file)
      } else {
        // Get all information from the route based on the file path
        const info = this.#getRouteInfo(dir + '/' + file)

        this.#routes.push(info)
      }
    }
  }
}
