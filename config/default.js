const config = {
  knex: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_DB || require('../config/development.json').postgresql.DATABASE_DB,
      user: process.env.DATABASE_USER || require('../config/development.json').postgresql.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD || require('../config/development.json').postgresql.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST || require('../config/development.json').postgresql.DATABASE_HOST,
      port: 5432,
      ssl: true,
      url: process.env.DATABASE_URL || require('../config/development.json').postgresql.DATABASE_URL
    },
    pool: {
      min: 1,
      max: 2,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
  }
}

module.exports = config
