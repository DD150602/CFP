import express, { json } from 'express'
import routes from './routes/routes.js'
import corsMiddleware from './middlewares/cors.middleware.js'
import errorMiddleware from './middlewares/error.middleware.js'
import { PORT } from './config/env.config.js'

const app = express()

app.use(corsMiddleware())
app.use(json())

app.use('/api', routes)

app.use(errorMiddleware)

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
