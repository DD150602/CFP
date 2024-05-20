import UserModel from '../models/user.model.js'
import { CantCreate, NoData } from '../schemas/error.schema.js'

export default class UserController {
  static async findAllUsers (req, res, next) {
    const response = await UserModel.findAllUsers()
    if (response.length === 0) {
      const error = new NoData({
        message: 'No existen datos',
        name: 'NoData',
        statusCode: 404
      })
      return next(error)
    }
    return res.json(response)
  }

  static async findUserById (req, res, next) {
    const { id } = req.params
    const response = await UserModel.findUserById(id)
    if (response.length === 0) {
      const error = new NoData({
        message: 'No existen datos',
        name: 'NoData',
        statusCode: 404
      })
      return next(error)
    }
    return res.json(response)
  }

  static async createUser (req, res, next) {
    const data = req.body
    const response = await UserModel.createUser(data)
    if (response instanceof Error) {
      const error = new CantCreate({
        message: response.message,
        name: response.name,
        statusCode: 400
      })
      return next(error)
    }
    return res.json(response)
  }

  static async updateUser (req, res, next) {
    const { id } = req.params
    const data = req.body
    const response = await UserModel.updateUser(id, data)
    if (response instanceof Error) {
      const error = new CantCreate({
        message: response.message,
        name: response.name,
        statusCode: 400
      })
      return next(error)
    }
    return res.json(response)
  }
};
