const Boom = require('@hapi/boom')
const { buildCheckFunction, validationResult } = require('express-validator')
const Logger = require('../../utils/logger')

const body = buildCheckFunction(['body'])

module.exports = class ValidationRequiredFields {
  static validatePostFood() {
    return [
      body('food').trim().isLength({ min: 1 }).withMessage('Campo food obrigatório.'),
      body('type').trim().isLength({ min: 1 }).withMessage('Campo type obrigatório.'),
    ]
  }

  static validatePostType() {
    return [body('type').trim().isLength({ min: 1 }).withMessage('Campo type obrigatório.')]
  }

  static isValidFields(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const err = errors.array({ onlyFirstError: true })
      Logger.error(err[0].msg)
      res.status(400).json(Boom.badRequest(err[0].msg).output.payload)
    } else {
      next()
    }
  }
}
