import mysql2 from 'mysql2/promise'

const CONNECTION_STRING = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'CFP'
}

let db

try {
  db = await mysql2.createConnection(CONNECTION_STRING)
  console.log('Connected to database')
} catch (error) {
  console.log('Error connecting to database', error)
}

export default db
