import db from '../config/db.js'

export default class UserModel {
  static async findAllUsers () {
    try {
      const [users] = await db.query(
        `SELECT BIN_TO_UUID(id_usuario) id_usuario, nombre_usuario, numero_documento, numero_contacto, direccion, correo, registros_bancarios
        FROM users`)
      return users
    } catch (error) {
      return error
    }
  }
};
