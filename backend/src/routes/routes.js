const { Router } = require('express')

const SwaggerRoutes = require('../../docs')
const GameRoutes = require('./game-routes')

const route = Router()

const defaultObject = () => ({
  core: 'API Gourmet Game',
  version: 'v1',
  date: new Date(),
})

module.exports = class Routers {
  static initialize() {
    route.all(['/gourmet-game'], (req, res) => {
      res.json(defaultObject)
    })

    SwaggerRoutes.ui(route)
    GameRoutes.routes(route)

    route.use((_, res) => res.status(200).json(defaultObject()))

    return route
  }
}
