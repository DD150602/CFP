import cors from 'cors'
import { CorsNotAllowed } from '../schemas/error.schema.js'

const ACCEPTED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:4321'
]

export default function corsMiddleware ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) {
  return cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) return callback(null, true)
      if (!origin) return callback(null, true)

      return callback(new CorsNotAllowed())
    }
  })
}
