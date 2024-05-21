import db from '../config/db.js'

export default class UserModel {
  static async findAllUsers () {
    try {
      const [users] = await db.query(
        `SELECT BIN_TO_UUID(id_usuario) id, nombre_usuario, numero_documento, numero_contacto, direccion, correo, registros_bancarios
        FROM users`)
      return users
    } catch (error) {
      return error
    }
  }

  static async findUserById (id) {
    try {
      const [user] = await db.query(
        `SELECT BIN_TO_UUID(id_usuario) id_usuario, nombre_usuario, numero_documento, numero_contacto, direccion, correo, registros_bancarios
        FROM users 
        WHERE id_usuario = UUID_TO_BIN(?)`, [id])

      return user
    } catch (error) {
      return error
    }
  }

  static async createUser (input) {
    try {
      console.log(input)
      const { nombreUsuario, numeroDocumento, numeroContacto, direccion, correo, registrosBancarios } = input
      const strigify = JSON.stringify(registrosBancarios)

      await db.query(
        `INSERT INTO users (nombre_usuario, numero_documento, numero_contacto, direccion, correo, registros_bancarios) VALUES
        (?, ?, ?, ?, ?, ?)`,
        [nombreUsuario, numeroDocumento, numeroContacto, direccion, correo, strigify]
      )

      return {
        message: 'User created successfully'
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  static async updateUser (id, input) {
    try {
      const { nombreUsuario, numeroDocumento, numeroContacto, direccion, correo, registrosBancarios } = input
      const strigify = JSON.stringify(registrosBancarios)

      await db.query(
        `UPDATE users SET nombre_usuario = ?, numero_documento = ?, numero_contacto = ?, direccion = ?, correo = ?, registros_bancarios = ?  
        WHERE id_usuario = UUID_TO_BIN(?)`,
        [nombreUsuario, numeroDocumento, numeroContacto, direccion, correo, strigify, id]
      )

      return {
        message: 'User updated successfully'
      }
    } catch (error) {
      return error
    }
  }
};
