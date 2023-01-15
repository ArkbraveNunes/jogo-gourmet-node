const Boom = require('@hapi/boom')
const GameService = require('../services/game-service')

module.exports = class GameController {
  static async getFoods(req, res) {
    const gameService = new GameService()
    return gameService
      .getFoods()
      .then((result) => (result && result.length ? res.json(result) : res.sendStatus(204)))
      .catch((err) =>
        err.statusCode
          ? res.status(err.statusCode).json(err)
          : res.status(500).json(Boom.internal('Internal Server Error').output.payload),
      )
  }

  static async getFood(req, res) {
    const { skip = 0, type = '' } = req.query
    const gameService = new GameService()
    return gameService
      .getFood({ skip, type })
      .then((result) => res.json(result))
      .catch((err) =>
        err.statusCode
          ? res.status(err.statusCode).json(err)
          : res.status(500).json(Boom.internal('Internal Server Error').output.payload),
      )
  }

  static async postFood(req, res) {
    const { body } = req
    const gameService = new GameService()
    return gameService
      .postFood(body)
      .then((result) => res.json(result))
      .catch((err) =>
        err.statusCode
          ? res.status(err.statusCode).json(err)
          : res.status(500).json(Boom.internal('Internal Server Error').output.payload),
      )
  }

  static async getTypes(req, res) {
    const gameService = new GameService()
    return gameService
      .getTypes()
      .then((result) => (result && result.length ? res.json(result) : res.sendStatus(204)))
      .catch((err) =>
        err.statusCode
          ? res.status(err.statusCode).json(err)
          : res.status(500).json(Boom.internal('Internal Server Error').output.payload),
      )
  }

  static async getType(req, res) {
    const { skip = 0 } = req.query
    const gameService = new GameService()
    return gameService
      .getType({ skip })
      .then((result) => res.json(result))
      .catch((err) =>
        err.statusCode
          ? res.status(err.statusCode).json(err)
          : res.status(500).json(Boom.internal('Internal Server Error').output.payload),
      )
  }

  static async postType(req, res) {
    const { body } = req
    const gameService = new GameService()
    return gameService
      .postType(body)
      .then((result) => res.json(result))
      .catch((err) =>
        err.statusCode
          ? res.status(err.statusCode).json(err)
          : res.status(500).json(Boom.internal('Internal Server Error').output.payload),
      )
  }
}
