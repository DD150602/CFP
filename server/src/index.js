import express, { json } from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(json())

app.use('/api', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.listen(3000, () => console.log('Listening on port http://localhost:3000'))
