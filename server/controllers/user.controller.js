import UserModel from '../models/user.model.js'
import { NoData } from '../schemas/error.schema.js'

export default class UserController {
  static async findAllUsers (req, res, next) {
    const response = await UserModel.findAllUsers()
    if (response.length === 0) {
      const error = new NoData({
        message: 'No existen productos',
        name: 'NoData',
        statusCode: 404
      })
      return next(error)
    }
    return res.json(response)
  }
};
