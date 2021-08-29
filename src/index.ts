import express from 'express'
import {
  ConnectionOptions, createConnection,
} from 'typeorm'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import routes from './routes'
import config from './ormconfig'

const app = express()
const port = 9000

app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use('/api/', routes)

const getOptions = () => {
  let connectionOptions: ConnectionOptions
  connectionOptions = {
    type: 'postgres',
    synchronize: true,
    logging: false,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    entities: [
      'dist/entities/*.js',
    ],
  }
  if (process.env.DATABASE_URL) {
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL })
  } else {
    // gets your default configuration
    // you could get a specific config by name getConnectionOptions('production')
    // or getConnectionOptions(process.env.NODE_ENV)
    connectionOptions = <ConnectionOptions>config
  }
  return connectionOptions
}

const ormConfig = getOptions()
createConnection(ormConfig)
  .then(() => {
    app.listen(process.env.PORT || port, () => console.log(`App running on port ${process.env.PORT || port}. . .`))
  })
  .catch((err) => {
    console.log('Unable to connect to db', err)
    process.exit(1)
  })
