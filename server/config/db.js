import mysql2 from 'mysql2/promise'
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USER } from './env.config.js'

const CONNECTION_STRING = {
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME
}

let db

try {
  db = await mysql2.createConnection(CONNECTION_STRING)
  console.log('Connected to database')
} catch (error) {
  console.log('Error connecting to database', error)
}

export default db
