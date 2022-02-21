import http from 'http'
import request from 'supertest'
import Boryx from './Boryx'

describe('Boryx', () => {
  describe('Routes', () => {
    it('should return one route', () => {
      const app = new Boryx()

      const callback = () => {
        // do nothing
      }

      app.get('/', callback)

      expect(app.list()).toEqual([
        {
          method: 'GET',
          path: '/',
          callback,
        },
      ])
    })

    it('should return an invalid request response', async () => {
      const app = new Boryx()

      const response = await request(app.createServer()).get('/wrong')
      expect(response.body).toEqual({ error: 'Invalid request!' })
    })

    it('should return hello world response', async () => {
      const app = new Boryx()

      app.get('/', (req, res) => {
        res.end(JSON.stringify({ hello: 'World' }))
      })

      const response = await request(app.createServer()).get('/')
      expect(response.body).toEqual({ hello: 'World' })
    })
  })

  describe('Run', () => {
    let spyCreateServer
    afterEach(() => {
      spyCreateServer.mockRestore()
    })

    it('should start, listen and close the server', () => {
      const onListen = jest.fn()
      const onClose = jest.fn()

      spyCreateServer = jest
        .spyOn(http, 'createServer')
        // @ts-ignore
        .mockImplementation(() => ({
          listen: onListen,
          close: onClose,
        }))

      const app = new Boryx()
      app.run()
      app.close()

      expect(http.createServer).toBeCalled()
      expect(onListen).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('should accept a callback', () => {
      const onListen = jest.fn()
      const onCallBack = jest.fn()

      spyCreateServer = jest
        .spyOn(http, 'createServer')
        // @ts-ignore
        .mockImplementation(() => ({
          listen: onListen,
        }))

      const app = new Boryx()
      app.run(() => onCallBack())

      expect(http.createServer).toBeCalled()
      expect(onListen).toHaveBeenCalledTimes(1)
      expect(onCallBack).toHaveBeenCalledTimes(1)
    })
  })
})
