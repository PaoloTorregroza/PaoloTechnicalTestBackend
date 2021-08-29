const config = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'test',
  password: 'development',
  database: 'fusepong',
  synchronize: true,
  logging: true,
  logger: 'file',
  entities: ['dist/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
}

export default config
