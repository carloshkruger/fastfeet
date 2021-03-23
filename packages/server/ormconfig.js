module.exports = [
  {
    name: 'default',
    type: process.env.FASTFEET_TYPEORM_CONNECTION,
    host: process.env.FASTFEET_TYPEORM_HOST,
    port: process.env.FASTFEET_TYPEORM_PORT,
    username: process.env.FASTFEET_TYPEORM_USERNAME,
    password: process.env.FASTFEET_TYPEORM_PASSWORD,
    database: process.env.FASTFEET_TYPEORM_DATABASE,
    entities: ['./src/infra/typeorm/models/*.ts'],
    migrations: ['./src/infra/typeorm/migrations/*.ts'],
    cli: {
      migrationsDir: './src/infra/typeorm/migrations'
    },
    logging: false
  }
]
