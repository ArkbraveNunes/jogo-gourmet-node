const GameController = require('../controllers/game-controller')
const GameRequiredFields = require('./middlewares/game-routes-validation')

module.exports = class GameRoutes {
  static routes(route) {
    route.route('/gourmet-game/v1/foods').get(GameController.getFoods)

    route
      .route('/gourmet-game/v1/food')
      .get(GameController.getFood)
      .post(
        GameRequiredFields.validatePostFood(),
        GameRequiredFields.isValidFields,
        GameController.postFood,
      )

    route.route('/gourmet-game/v1/types').get(GameController.getTypes)

    route
      .route('/gourmet-game/v1/type')
      .get(GameController.getType)
      .post(
        GameRequiredFields.validatePostType(),
        GameRequiredFields.isValidFields,
        GameController.postType,
      )
  }
}
