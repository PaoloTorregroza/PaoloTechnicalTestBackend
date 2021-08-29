import express from 'express'
import { createConnection } from 'typeorm'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import routes from './routes'

const app = express()
const port = 9000

app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use('/api/', routes)

createConnection({
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USER || 'test',
  password: process.env.DB_PASSWORD || 'development',
  database: 'fusepong',
})
  .then(() => {
    app.listen(process.env.PORT || port, () => console.log(`App running on port ${port}. . .`))
  })
  .catch((err) => {
    console.log('Unable to connect to db', err)
    process.exit(1)
  })
