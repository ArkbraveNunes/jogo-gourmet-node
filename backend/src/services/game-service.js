const Boom = require('@hapi/boom')
const fs = require('fs')
const Logger = require('../utils/logger')

module.exports = class GameService {
  async getFoods() {
    try {
      const result = await this.readFileJson('./src/database/foods.json')
      return result
    } catch (error) {
      Logger.error(error)
      throw error
    }
  }

  async getFood(query) {
    try {
      const { skip = 0, type = '' } = query
      const findFoods = await this.readFileJson('./src/database/foods.json')
      const result = findFoods.filter((item) => item.type === type)
      if (!result[skip]) {
        throw Boom.notFound('Food is not exist').output.payload
      }
      return result[skip]
    } catch (error) {
      Logger.error(error)
      throw error
    }
  }

  async postFood(body) {
    try {
      await this.writeFileJson('./src/database/foods.json', body)
      await this.checkTypeExists(body.type)
      return body
    } catch (error) {
      Logger.error(error)
      throw error
    }
  }

  async getTypes() {
    try {
      const result = await this.readFileJson('./src/database/types.json')
      return result
    } catch (error) {
      Logger.error(error)
      throw error
    }
  }

  async getType(query) {
    try {
      const { skip = 0 } = query
      const result = await this.readFileJson('./src/database/types.json')
      if (!result[skip]) {
        throw Boom.notFound('Type is not exist').output.payload
      }
      return result[skip]
    } catch (error) {
      Logger.error(error)
      throw error
    }
  }

  async postType(body) {
    try {
      await this.writeFileJson('./src/database/types.json', body)
      return body
    } catch (error) {
      Logger.error(error)
      throw error
    }
  }

  async checkTypeExists(type) {
    const findTypes = await this.readFileJson('./src/database/types.json')
    const typeIsExist = findTypes.filter((item) => item.type === type)
    if (typeIsExist.length < 1) {
      await this.postType({ type })
    }
  }

  async readFileJson(path) {
    try {
      const result = await new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
          if (err) {
            reject(err)
          }
          resolve(data)
        })
      })
      return JSON.parse(result)
    } catch (error) {
      Logger.error(error)
      throw error
    }
  }

  async writeFileJson(path, objectToAppend) {
    try {
      let baseJson = await this.readFileJson(path)
      baseJson = [...baseJson, objectToAppend]
      await new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(baseJson), (err) => {
          if (err) {
            reject(err)
          }
          resolve()
        })
      })
    } catch (error) {
      Logger.error(error)
      throw error
    }
  }
}
